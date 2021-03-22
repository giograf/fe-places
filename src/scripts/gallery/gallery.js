import GalleryApi from './galleryApi';
import LocationItem from '../locationItem/locationItem';
import Navigation from '../navigation/navigation'

export default class Gallery  {
    constructor() {
        this.galleryApi = new GalleryApi();
        this.navigation = new Navigation();
        this.locationItems = this.galleryApi.getLocationItems();
        this.locationItemsToHtml();
        this.locationItemClickHandler();
    }

    getLocationItems = () => {
        return this.locationItems;
    }

    locationItemClickHandler = () => {
        document.querySelectorAll(".gallery__location-item").forEach((itemHtml) => {
            itemHtml.addEventListener('click', (event) => {
                let locationItemHtmlParent = event.path.find((locationItemHtmlProbablyParent) => {
                    if (locationItemHtmlProbablyParent.classList) {
                        for (const [key, value] of Object.entries(locationItemHtmlProbablyParent.classList)) {
                            if (value === "gallery__location-item") {
                                return true
                            }
                          }
                    }
                    return false;
                })

                this.selectedLocationItem = this.locationItems.find(locationItem => {
                    return locationItemHtmlParent.getAttribute("data-location-id") == locationItem.id
                })
            });
        })
    }

    locationItemsToHtml = () => {
        const locationItemsHtmlArray = this.locationItems.map((locationItem) => {
            // TODO: sanitize all HTML in the app
            return `<div
                        class="gallery__location-item"
                        data-location-id="${locationItem.id}"
                        data-location-lng="${locationItem.geolocation.lng}"
                        data-location-lat=${locationItem.geolocation.lat}""
                    >
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
                    </div>`
        })

        document.querySelector(".gallery__locations-list").innerHTML = locationItemsHtmlArray.join("");
        this.navigation.locationItemFullViewHandler();
    }
}
