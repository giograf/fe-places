import LocationItem from './locationItem';

export default class LocationItemSubmissionView extends LocationItem {
    constructor(gallery) {
        super(new LocationItem());

        this.gallery = gallery;

        this.locationItemSubmissionContainerOpener = document.querySelector(".places__add-location");
        this.locationItemSubmissionContainerCloser = document.querySelector(".location-item-submission-view__close");
        this.locationItemSubmissionContainer = document.querySelector(".location-item-submission-view");
        this.locationItemSubmissionWrapper = document.querySelector(".location-item-submission-view__wrapper");

        this.locationItemSubmissionViewOpen = false;

        this.locationItemSubmissionViewOpenHandler();
    }
    
    locationItemSubmissionViewToHtml = () => {
        if (this.keywords) {
            const itemKewordsHtml = this.keywords.map((keyword) => {
                return `<div class="location-item-submission-view__keyword">${keyword}</div>`;
            })
            .join('');
        }

        const html = `  <h2>Add new place:</h2>
                        <input type="text" name="name" value="${this.title ?? ""}" placeholder="Name" class="" />
                        <textarea name="description" rows="7" placeholder="Description" class="">${this.description ?? ""}</textarea>
                        <div class="location-item-submission-view__footer">
                            <input type="time" name="opening-hour" value="${this.openingHour ?? ""}" placeholder="Opening Hour" class="" />
                            <input type="time" name="closing-hour" value="${this.closingHour ?? ""}" placeholder="Closing Hour" class="" />
                            <button
                                aria-label="${this.favourite ? "Remove from favourites" : "Add to favourites"}"
                                class="location-item-submission-view__favourite"
                                data-favourite="${this.favourite ?? false}"
                            >
                                <i class="im im-star"></i>
                            </button>
                        </div>
                        <button class="location-item-submission-view__submit">Add</button>`;
        
        this.locationItemSubmissionWrapper.innerHTML = html;

        this.locationItemSubmissionViewCloseHandler();
        this.locationItemSubmitButtonClickHandler();
        this.locationItemFavouriteButtonClickHandler();
    };

    //
    // Handlers
    // 

    locationItemSubmissionViewOpenHandler = () => {
        this.locationItemSubmissionContainerOpener.addEventListener('click', (event) => {
            this.locationItemSubmissionContainer.classList.add('location-item-submission-view--open');
            this.locationItemSubmissionViewOpen = true;
            this.locationItemSubmissionViewToHtml();
        });
    }

    locationItemSubmissionViewCloseHandler = () => {
        this.locationItemSubmissionContainerCloser.addEventListener('click', (event) => { 
            this.locationItemSubmissionContainer.classList.remove('location-item-submission-view--open')
            this.locationItemSubmissionViewOpen = false;
        });
    }

    locationItemFavouriteButtonClickHandler = () => {
        document.querySelector('.location-item-submission-view__favourite').addEventListener('click', (event) => { 
            // TODO: get the item data from the form
            this.item.favourite = !this.item.favourite;
            let button = event.target.tagName === "BUTTON" ? event.target : event.target.parentElement;
            button.setAttribute("data-favourite", this.item.favourite);
        });
    };

    locationItemSubmitButtonClickHandler = () => {
        document.querySelector('.location-item-submission-view__submit').addEventListener('click', (event) => { 
            // TODO: get the item data from the form
            this.addLocationItem(item);
        });
    };
}