import GalleryApi from './galleryApi';
import LocationItem from '../locationItem/locationItem';
import Navigation from '../navigation/navigation';
import LocationItemFullView from '../locationItem/locationItemFullView';
import LocationItemSubmissionView from '../locationItem/locationItemSubmissionView';

export default class Gallery {
    constructor(googleMap, navigation) {
        this.openNowSelected = false;
        this.onlyFavouritesSelected = false;
        this.selectedLocationItem = null;
        this.galleryApi = new GalleryApi();
        this.LocationItemSubmissionView = new LocationItemSubmissionView(this);
        this.locationItemFullView = null;
        this.googleMap = googleMap;
        this.navigation = navigation;
        this.locationItems = this.getLocationItems();

        // Render the initial set of location items
        this.locationItemClickHandler();
        this.onlyFavouritesButtonClickedHandler();
        this.openNowButtonClickedHandler();
    }

    getLocationItems = async (openNow, onlyFavourites) => {
        this.locationItems = await this.galleryApi.getLocationItems(
            openNow,
            onlyFavourites,
        );

        this.locationItemsToHtml(this.locationItems);
        return this.locationItems;
    };

    onlyFavouritesButtonClickedHandler = () => {
        // TODO: add event listener
        document
            .querySelector('.gallery_search-only-favourites')
            .addEventListener('click', async (event) => {
                this.onlyFavouritesSelected = !this.onlyFavouritesSelected;
                this.locationItems = await this.getLocationItems(
                    this.openNowSelected,
                    this.onlyFavouritesSelected,
                    this.locationItems,
                );

                this.onlyFavouritesSelected ?
                    event.target.classList.add("gallery_search-only-favourites--selected") :
                    event.target.classList.remove("gallery_search-only-favourites--selected");

                this.locationItemsToHtml(this.locationItems);
                // TODO: Add map marker update
            });
    };

    openNowButtonClickedHandler = async () => {
        document
            .querySelector('.gallery_search-only-open')
            .addEventListener('click', async (event) => {
                this.openNowSelected = !this.openNowSelected;
                this.locationItems = await this.getLocationItems(
                    this.openNowSelected,
                    this.onlyFavouritesSelected,
                    this.locationItems,
                );

                this.openNowSelected ?
                    event.target.classList.add("gallery_search-only-open--selected") :
                    event.target.classList.remove("gallery_search-only-open--selected");

                this.locationItemsToHtml(this.locationItems);
                // TODO: Add map marker update
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

                    this.locationItemFullView = new LocationItemFullView(this.selectedLocationItem, this);
                    this.selectedLocationItem.locationMarker && this.googleMap.focusOnLocationItem(this.selectedLocationItem);
                });
            });
    };

    locationItemsToHtml = (locationItems) => {        
        const locationItemsHtmlArray = this.locationItems.map(
            (locationItem) => {
                const closingHourString = locationItem.closingHour?.hour < 10 ? "0" + locationItem.closingHour?.hour : locationItem.closingHour?.hour;
                const closingMinuteString = locationItem.closingHour?.minute < 10 ? "0" + locationItem.closingHour?.minute : locationItem.closingHour?.minute;
                const openingHourString = locationItem.openingHour?.hour < 10 ? "0" + locationItem.openingHour?.hour : locationItem.openingHour?.hour;
                const openingMinuteString = locationItem.openingHour?.minute < 10 ? "0" + locationItem.openingHour?.minute : locationItem.openingHour?.minute;

                const openingHoursString = openingHourString && openingMinuteString ? openingHourString + ":" + openingMinuteString : "";
                const closingHoursString = closingHourString && closingMinuteString ? closingHourString + ":" + closingMinuteString : "";

                const openTimePeriodString = openingHoursString + " - " + closingHoursString;
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
                                ${openTimePeriodString}
                            </div>
                            <button
                                aria-label="${locationItem.favourite ? "Remove from favourites" : "Add to favourites"}"
                                class="gallery__location-item-favourite"
                                data-favourite="${locationItem.favourite}"
                            >
                                <i class="im im-star"></i>
                            </button>
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

        this.locationItems.forEach((locationItem) => {
            locationItem.locationMarker && locationItem.locationMarker.addListener("click", () => {
                this.selectedLocationItem = locationItem;
                this.locationItemFullView = new LocationItemFullView(this.selectedLocationItem, this);
                this.googleMap.focusOnLocationItem(this.selectedLocationItem);
            });
        })

        // Handlers
        this.locationItemClickHandler();

        // this.googleMap.removeMarker(this.locationItems[0].locationMarker)
        // delete this.locationItems[0].locationMarker;
    };
}
