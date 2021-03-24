import GalleryApi from './galleryApi';
import LocationItem from '../locationItem/locationItem';
import Navigation from '../navigation/navigation';

export default class Gallery {
    constructor(googleMap, navigation) {
        this.openNowSelected = false;
        this.onlyFavouritesSelected = false;
        this.galleryApi = new GalleryApi();
        this.googleMap = googleMap;
        this.navigation = navigation;
        this.locationItems = this.galleryApi.getLocationItems();
        this.selectedLocationItem = null;

        // Render the initial set of location items
        this.locationItemsToHtml(this.locationItems);
        this.locationItemClickHandler();
    }

    getLocationItems = (openNow, onlyFavourites) => {
        this.locationItems = this.galleryApi.getLocationItems(
            openNow,
            onlyFavourites,
        );
        return this.locationItems;
    };

    OnlyFavouritesButtonClickedHandler = () => {
        // TODO: add event listener
        this.onlyFavouritesSelected = !this.onlyFavouritesSelected;
        this.locationItems = this.getLocationItems(
            this.openNowSelected,
            this.onlyFavouritesSelected,
            this.locationItems,
        );
    };

    OpenNowButtonClickedHandler = () => {
        // TODO: add event listener
        this.openNowSelected = !this.openNowSelected;
        this.locationItems = this.getLocationItems(
            this.openNowSelected,
            this.onlyFavouritesSelected,
            this.locationItems,
        );
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

                    this.locationItemFullViewToHtml(this.selectedLocationItem);
                    this.navigation.openLocationItemFullView();
                });
            });
    };

    locationItemFullViewToHtml = (locationItem) => {
        const itemKewordsHtml = locationItem.keywords
            .map((keyword) => {
                return `<div class="location-item-full-view__keyword">${keyword}</div>`;
            })
            .join('');
            
        const html = `  
                    <div class="location-item-full-view__item-wrapper">
                        <div class="location-item-full-view__name">
                            ${locationItem.title}
                        </div>
                        <div class="location-item-full-view__description">
                            ${locationItem.description}                            
                        </div>
                        <div class="location-item-full-view__footer">
                            <div class="location-item-full-view__hours">    
                                <div class="location-item-full-view__opening-hour">${locationItem.openingHour}</div>
                                <div class="location-item-full-view__hour-separator">-</div>
                                <div class="location-item-full-view__closing-hour">${locationItem.closingHour}</div>
                            </div>
                            <div class="location-item-full-view__keywords">
                                ${itemKewordsHtml}
                            </div>
                            <div
                                class="location-item-full-view__favourite"
                                data-favourite="${locationItem.favourite}"
                            >
                                <i class="im im-star"></i>
                            </div>
                        </div>
                    </div>
                    <button class="button__location-item-full-view__submit>
                        Edit
                    </button>`;

        //this.locationItemEditButtonClickHandler();

        document.querySelector(
            '.location-item-full-view__wrapper',
        ).innerHTML = html;
    };

    locationItemEditButtonClickHandler = () => {
        this.navigation.openLocationItemEditView()
    }

    locationItemsToHtml = (locationItems) => {
        // Prepare HTML for Location Items
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
        this.locationItems = this.googleMap.renderItemLocationMarkers(locationItems);

        // this.googleMap.removeMarker(this.locationItems[0].locationMarker)
        // delete this.locationItems[0].locationMarker;
    };
}
