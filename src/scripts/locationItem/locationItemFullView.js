import LocationItem from './locationItem';

export default class LocationItemFullView extends LocationItem {
    constructor(item) {
        super(item);

        this.locationItemFullViewToHtml(this.item);
        this.locationItemFullViewCloseHandler();
        this.openLocationItemFullView();
    }

    locationItemFullViewToHtml = (locationItem) => {
        const itemKewordsHtml = locationItem.keywords
            .map((keyword) => {
                return `<div class="location-item-full-view__keyword">${keyword}</div>`;
            })
            .join('');

        var closingHourString = locationItem.closingHour.hour < 10 ? "0" + locationItem.closingHour.hour : locationItem.closingHour.hour;
        var closingMinuteString = locationItem.closingHour.minute < 10 ? "0" + locationItem.closingHour.minute : locationItem.closingHour.minute;
        var openingHourString = locationItem.openingHour.hour < 10 ? "0" + locationItem.openingHour.hour : locationItem.openingHour.hour;             
        var openingMinuteString = locationItem.openingHour.minute < 10 ? "0" + locationItem.openingHour.minute : locationItem.openingHour.minute;
                

        const html = `  <div class="location-item-full-view__name">
                            ${locationItem.title}
                        </div>
                        <div class="location-item-full-view__description">
                            ${locationItem.description}                            
                        </div>
                        <div class="location-item-full-view__footer">
                            <div class="location-item-full-view__hours">    
                                <div class="location-item-full-view__opening-hour">
                                    ${openingHourString}:${openingMinuteString}
                                </div>
                                <div class="location-item-full-view__hour-separator">-</div>
                                <div class="location-item-full-view__closing-hour">
                                    ${closingHourString}:${closingMinuteString}
                                </div>
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
                        <button class="button__location-item-full-view__submit">Edit</button>`;

        //this.locationItemEditButtonClickHandler();

        document.querySelector(
            '.location-item-full-view__wrapper',
        ).innerHTML = html;
    };

    locationItemEditButtonClickHandler = () => {
        this.navigation.openLocationItemEditView();
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