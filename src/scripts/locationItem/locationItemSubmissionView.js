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
                        <input type="text" name="name" value="${this.title}" placeholder="Name" class="" />
                        <textarea name="description" rows="5" value="${this.description}" placeholder="Description" class=""></textarea>
                        <div class="location-item-submission-view__footer">
                            <input type="time" name="opening-hour" value="${this.openingHour}" placeholder="Opening Hour" class="" />
                            <input type="time" name="closing-hour" value="${this.closingHour}" placeholder="Closing Hour" class="" />
                            <div
                                class="location-item-submission-view__favourite"
                                data-favourite="${this.favourite}"
                            >
                                <i class="im im-star"></i>
                            </div>
                        </div>
                        <button class="location-item-submission-view__submit">Add</div>`;
        
        this.locationItemSubmissionWrapper.innerHTML = html;

        this.locationItemSubmissionViewCloseHandler();
        this.locationItemSubmitButtonClickHandler()
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

    locationItemSubmitButtonClickHandler = () => {
        document.querySelector('.location-item-submission-view__submit').addEventListener('click', (event) => { 
            // TODO: get the item data from the form
            this.addLocationItem(item);
        });
    };
}