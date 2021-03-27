import GalleryApi from './galleryApi';
import LocationItem from '../locationItem/locationItem';
import Navigation from '../navigation/navigation';
import LocationItemFullView from '../locationItem/locationItemFullView';
import LocationItemSubmissionView from '../locationItem/locationItemSubmissionView';
import LocationItemEditView from '../locationItem/locationItemEditView';

export default class Gallery {
    constructor(googleMap, navigation) {
        this.openNowSelected = false;
        this.onlyFavouritesSelected = false;
        this.selectedLocationItem = null;
        this.galleryApi = new GalleryApi();
        this.LocationItemSubmissionView = new LocationItemSubmissionView(this);
        this.LocationItemEditView = new LocationItemEditView(this);
        this.locationItemFullView = null;
        this.googleMap = googleMap;
        this.navigation = navigation;
        this.locationItems = this.galleryApi.getLocationItems();

        // Render the initial set of location items
        this.locationItemsToHtml(this.locationItems);
        this.locationItemClickHandler();
        this.onlyFavouritesButtonClickedHandler();
        this.openNowButtonClickedHandler();
    }

    getLocationItems = (openNow, onlyFavourites) => {
        this.locationItems = this.galleryApi.getLocationItems(
            openNow,
            onlyFavourites,
        );
        return this.locationItems;
    };

    onlyFavouritesButtonClickedHandler = () => {
        // TODO: add event listener
        document
            .querySelector('.gallery_search-only-favourites')
            .addEventListener('click', (event) => {
                this.onlyFavouritesSelected = !this.onlyFavouritesSelected;
                this.locationItems = this.getLocationItems(
                    this.openNowSelected,
                    this.onlyFavouritesSelected,
                    this.locationItems,
                );

                this.locationItemsToHtml(this.locationItems); // TODO: Add map marker update
                // TODO: Add map marker update
                this.locationItemClickHandler();
            });
    };

    openNowButtonClickedHandler = () => {
        document
            .querySelector('.gallery_search-only-open')
            .addEventListener('click', (event) => {
                this.openNowSelected = !this.openNowSelected;
                this.locationItems = this.getLocationItems(
                    this.openNowSelected,
                    this.onlyFavouritesSelected,
                    this.locationItems,
                );

                this.locationItemsToHtml(this.locationItems);
                // TODO: Add map marker update
                this.locationItemClickHandler();
            });
    };

    locationItemClickHandler = () => {
        document
            .querySelectorAll('.gallery__location-item')
            .forEach((itemHtml) => {
                itemHtml.addEventListener('click', (event) => {
                    let locationItemHtmlParent = event.path.find(
                        (locationItemHtmlProbablyParent) => {
                            if (locationItemHtmlProbablyParent.classList) {
                                for (const [key, value] of Object.entries(
                                    locationItemHtmlProbablyParent.classList,
                                )) {
                                    if (value === 'gallery__location-item') {
                                        return true;
                                    }
                                }
                            }
                            return false;
                        },
                    );

                    this.selectedLocationItem = this.locationItems.find(
                        (locationItem) => {
                            return (
                                locationItemHtmlParent.getAttribute(
                                    'data-location-id',
                                ) == locationItem.id
                            );
                        },
                    );

                    this.locationItemFullView = new LocationItemFullView(this.selectedLocationItem);
                });
            });
    };

    locationItemsToHtml = (locationItems) => {
        // Prepare HTML for Location Items
        console.log(this);
        const locationItemsHtmlArray = this.locationItems.map(
            (locationItem) => {
                // TODO: sanitize all HTML in the app
                return `<div
                            class="gallery__location-item"
                            data-location-id="${locationItem.id}"
                            data-location-lng="${locationItem.geolocation.lng}"
                            data-location-lat="${locationItem.geolocation.lat}">
                        <div class="gallery__location-item-name">
                            ${locationItem.title}
                        </div>
                        <div class="gallery__location-item-description">
                            ${locationItem.description}
                        </div>
                        <div class="gallery__location-item-footer">
                            <div class="gallery__location-item-hours">
                                ${locationItem.openingHour}-${locationItem.closingHour}
                            </div>
                            <div
                                class="gallery__location-item-favourite"
                                data-favourite="${locationItem.favourite}"
                            >
                                <i class="im im-star"></i>
                            </div>
                        </div>
                    </div>`;
            },
        );

        // Add Location Items HTML to Gallery Locations List
        document.querySelector(
            '.gallery__locations-list',
        ).innerHTML = locationItemsHtmlArray.join('');

        // Get locationItems updated with marker references
        this.locationItems = this.googleMap.renderItemLocationMarkers(
            locationItems,
        );

        // this.googleMap.removeMarker(this.locationItems[0].locationMarker)
        // delete this.locationItems[0].locationMarker;
    };
}
