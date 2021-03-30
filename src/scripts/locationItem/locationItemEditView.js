import LocationItem from './locationItem';

export default class LocationItemEditView extends LocationItem {
    constructor(item, gallery) {
        super(item);

        this.gallery = gallery;
        this.locationItemEditViewToHtml(this.item);
        this.locationItemEditViewCloseHandler();
        this.openLocationItemEditView();
    }

    locationItemEditViewToHtml = (locationItem) => {
        const itemKewordsHtml =
            locationItem.keywords?.length > 0
                ? locationItem.keywords
                      .map((keyword) => {
                          return `<div class="location-item-edit-view__keyword">${keyword}</div>`;
                      })
                      .join('')
                : '';

        const closingHourString = locationItem.closingHour?.hour < 10 ? "0" + locationItem.closingHour?.hour : locationItem.closingHour?.hour;
        const closingMinuteString = locationItem.closingHour?.minute < 10 ? "0" + locationItem.closingHour?.minute : locationItem.closingHour?.minute;
        const openingHourString = locationItem.openingHour?.hour < 10 ? "0" + locationItem.openingHour?.hour : locationItem.openingHour?.hour;
        const openingMinuteString = locationItem.openingHour?.minute < 10 ? "0" + locationItem.openingHour?.minute : locationItem.openingHour?.minute;

        const html = `  
        <h2>Edit Place</h2>
        <input 
            type="text" 
            name="name" 
            class="location-item-edit-view__name" 
            value="${locationItem.title}" 
            aria-label="Place's title"
            placeholder="Name" class="" />
        <textarea 
            name="description" 
            rows="7" 
            class="location-item-edit-view__description"
            aria-label="Place's description"
            placeholder="Description" class="">${locationItem.description}</textarea>
        <div class="location-item-edit-view__footer">
            <input 
                type="time" 
                name="opening-hour" 
                class="location-item-edit-view__opening-hour" 
                value="${openingHourString}:${openingMinuteString}" 
                placeholder="Opening Hour" 
                aria-label="Place's opening hour"
                class="" />
            <input 
                type="time" 
                name="closing-hour" 
                class="location-item-edit-view__closing-hour" 
                value="${closingHourString}:${closingMinuteString}" 
                placeholder="Closing Hour"
                aria-label="Place's closing hour"
                class="" />
            <button
                aria-label="${locationItem.favourite ? "Remove from favourites" : "Add to favourites"}"
                class="location-item-edit-view__favourite"
                data-favourite="${locationItem.favourite}"
            >
                <i class="im im-star"></i>
            </button>
        </div>
        <button class="location-item-edit-view__submit">Apply</button>
        <button class="location-item-edit-view__delete">Delete</button`;

        // const html = `  <div class="location-item-edit-view__name">
        //                     ${locationItem.title}
        //                 </div>
        //                 <div class="location-item-edit-view__description">
        //                     ${locationItem.description}                            
        //                 </div>
        //                 <div class="location-item-edit-view__footer">
        //                     <div class="location-item-edit-view__hours">    
        //                         <div class="location-item-edit-view__opening-hour">
        //                             ${openingHourString}:${openingMinuteString}
        //                         </div>
        //                         <div class="location-item-edit-view__hour-separator">-</div>
        //                         <div class="location-item-edit-view__closing-hour">
        //                             ${closingHourString}:${closingMinuteString}
        //                         </div>
        //                     </div>
        //                     <div class="location-item-edit-view__keywords">
        //                         ${itemKewordsHtml}
        //                     </div>
        //                     <div
        //                         class="location-item-edit-view__favourite"
        //                         data-favourite="${locationItem.favourite}"
        //                     >
        //                         <i class="im im-star"></i>
        //                     </div>
        //                 </div>
        //                 <button class="location-item-edit-view__submit">Apply</button>
        //                 <button class="location-item-edit-view__delete">Delete</button>`;

        document.querySelector(
            '.location-item-edit-view__wrapper',
        ).innerHTML = html;

        this.locationItemApplyButtonClickHandler();
        this.locationItemDeleteButtonClickHandler();
    };

    openLocationItemEditView = () => {
        const locationItemEditViewContainer = document.querySelector(
            '.location-item-edit-view',
        );
        locationItemEditViewContainer.classList.add(
            'location-item-edit-view--open',
        );
        this.locationItemEditViewOpen = true;

        this.locationItemEditViewCloseHandler();
    };

    locationItemEditViewCloseHandler = () => {
        const locationItemEditViewContainer = document.querySelector(
            '.location-item-edit-view',
        );
        const locationItemEditViewContainerCloser = document.querySelector(
            '.location-item-edit-view__close',
        );

        locationItemEditViewContainerCloser.addEventListener(
            'click',
            (event) => {
                locationItemEditViewContainer.classList.remove(
                    'location-item-edit-view--open',
                );
                this.locationItemEditViewOpen = false;
            },
        );
    };

    locationItemApplyButtonClickHandler = () => {
        document
            .querySelector('.location-item-edit-view__submit')
            .addEventListener('click', () => {
                // TODO: get the item data from the form
                this.editLocationItem(this.item);
            });
    };

    locationItemDeleteButtonClickHandler = () => {
        document
            .querySelector('.location-item-edit-view__delete')
            .addEventListener('click', () => {
                const locationItemEditViewContainer = document.querySelector(
                    '.location-item-edit-view',
                );

                const locationItemFullViewContainer = document.querySelector(
                    '.location-item-full-view',
                );

                locationItemEditViewContainer.classList.remove(
                    'location-item-edit-view--open',
                );

                locationItemFullViewContainer.classList.remove(
                    'location-item-full-view--open',
                );

                this.removeLocationItem();
            });
    };
}
