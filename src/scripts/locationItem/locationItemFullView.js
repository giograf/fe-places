import LocationItem from './locationItem';
import LocationItemEditView from './locationItemEditView'

export default class LocationItemFullView extends LocationItem {
    constructor(item, gallery) {
        super(item);

        this.gallery = gallery;

        this.locationItemFullViewToHtml(this.item);
        this.locationItemFullViewCloseHandler();
        this.openLocationItemFullView();
    }

    locationItemFullViewToHtml = (locationItem) => {
        const itemKewordsHtml = locationItem.keywords?.length > 0 ?
            locationItem.keywords.map((keyword) => {
                return `<div class="location-item-full-view__keyword">${keyword}</div>`;
            })
            .join('') : "";

        const closingHourString = locationItem.closingHour?.hour < 10 ? "0" + locationItem.closingHour?.hour : locationItem.closingHour?.hour;
        const closingMinuteString = locationItem.closingHour?.minute < 10 ? "0" + locationItem.closingHour?.minute : locationItem.closingHour?.minute;
        const openingHourString = locationItem.openingHour?.hour < 10 ? "0" + locationItem.openingHour?.hour : locationItem.openingHour?.hour;
        const openingMinuteString = locationItem.openingHour?.minute < 10 ? "0" + locationItem.openingHour?.minute : locationItem.openingHour?.minute;

        const openingHoursString = openingHourString && openingMinuteString ? openingHourString + ":" + openingMinuteString : "";
        const closingHoursString = closingHourString && closingMinuteString ? closingHourString + ":" + closingMinuteString : "";

        const openTimePeriodString = openingHoursString + " - " + closingHoursString;

        const html = `  <div class="location-item-full-view__name">
                            ${locationItem.title}
                        </div>
                        <div class="location-item-full-view__description">
                            ${locationItem.description}                            
                        </div>
                        <div class="location-item-full-view__footer">
                            <div class="location-item-full-view__hours">    
                                <div class="location-item-full-view__opening-hour">
                                    ${openingHoursString}
                                </div>
                                <div class="location-item-full-view__hour-separator">-</div>
                                <div class="location-item-full-view__closing-hour">
                                    ${closingHoursString}
                                </div>
                            </div>
                            <div class="location-item-full-view__keywords">
                                ${itemKewordsHtml}
                            </div>
                            <button
                                aria-label="${locationItem.favourite ? "Remove from favourites" : "Add to favourites"}"
                                class="location-item-full-view__favourite"
                                data-favourite="${locationItem.favourite}"
                            >
                                <i class="im im-star"></i>
                            </button>
                        </div>
                        <button class="location-item-full-view__submit">Edit</button>`;

        document.querySelector(
            '.location-item-full-view__wrapper',
        ).innerHTML = html;

        this.locationItemEditButtonClickHandler();
    };

    locationItemEditButtonClickHandler = () => {
        document.querySelector(".location-item-full-view__submit")
            .addEventListener('click', (event) => {
                let editView = new LocationItemEditView(this.item, this.gallery);
        });
    };

    openLocationItemFullView = () => {
        const locationItemFullViewContainer = document.querySelector(".location-item-full-view");
        locationItemFullViewContainer.classList.add('location-item-full-view--open');
        this.locationItemFullViewOpen = true;

        this.locationItemFullViewCloseHandler();
    }

    locationItemFullViewCloseHandler = () => {
        const locationItemFullViewContainer = document.querySelector(".location-item-full-view");
        const locationItemFullViewContainerCloser = document.querySelector(".location-item-full-view__close")

        locationItemFullViewContainerCloser.addEventListener('click', (event) => {
            locationItemFullViewContainer.classList.remove('location-item-full-view--open')
            this.locationItemFullViewOpen = false;
        });
    }
}