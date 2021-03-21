export default class Navigation {
    constructor() {
        this.mobileMenuContainerToggle = document.querySelector(".header__mobile-menu-toggle");
        this.mobileMenuContainer = document.querySelector(".places__gallery");
        this.mobileMenuOpen = false;
        this.locationItemSubmissionContainerOpener = document.querySelector(".places__add-location");
        this.locationItemSubmissionContainerCloser = document.querySelector(".location-item-submission-view__close");
        this.locationItemSubmissionContainer = document.querySelector(".location-item-submission-view");
        this.locationItemSubmissionViewOpen = false;
        this.locationItemFullViewContainerOpener = document.querySelector(".gallery__location-item");
        this.locationItemFullViewContainerCloser = document.querySelector(".location-item-full-view__close")
        this.locationItemFullViewContainer = document.querySelector(".location-item-full-view");
        this.locationItemFullViewOpen = false;
        // this.locationItemEditViewContainerOpener = document.querySelector(".gallery__location-item")
        // this.locationItemEditViewContainerCloser = document.querySelector(".location-item-edit-view__close")
        // this.locationItemEditViewContiner = document.querySelector(".location-item-edit-view");
        // this.locationItemEditViewOpen = false;

        this.openMobileMenuHandler();
        this.locationItemSubmissionViewHandler()
        this.locationItemFullViewHandler();
    }

    openMobileMenuHandler = () => {
        this.mobileMenuContainerToggle.addEventListener('click', (event) => {
            this.mobileMenuOpen ? 
                this.mobileMenuContainer.classList.remove('places__gallery--open'):
                this.mobileMenuContainer.classList.add('places__gallery--open');
            this.mobileMenuOpen = !this.mobileMenuOpen;
        });
    }

    locationItemSubmissionViewHandler = () => {
        this.locationItemSubmissionContainerOpener.addEventListener('click', (event) => {
            this.locationItemSubmissionContainer.classList.add('location-item-submission-view--open');
            this.locationItemSubmissionViewOpen = true;
        });

        this.locationItemSubmissionContainerCloser.addEventListener('click', (event) => { 
            this.locationItemSubmissionContainer.classList.remove('location-item-submission-view--open')
            this.locationItemSubmissionViewOpen = false;
        });
    }

    locationItemFullViewHandler = () => {
        this.locationItemFullViewContainerOpener.addEventListener('click', (event) => {
            this.locationItemFullViewContainer.classList.add('location-item-full-view__-open');
            this.locationItemFullViewOpen = true;
        });

        this.locationItemFullViewContainerCloser.addEventListener('click', (event) => {
            this.locationItemFullViewContainer.classList.remove('location-item-full-view__-open')
            this.locationItemFullViewOpen = false;
        });
    }

    // locationItemEditViewHandler = () => {
    //     this.mobileMenuContainerOpener.addEventListener('click', (event) => {
    //         // TODO: Add Close Toggle
    //         this.locationItemEditViewOpen ? 
    //             this.locationItemEditViewContiner.classList.remove('location-item-edit-view--open'):
    //             this.locationItemEditViewContiner.classList.add('location-item-edit-view--open');
    //         this.locationItemEditViewOpen = !this.locationItemEditViewOpen;
    //     });
    // }
}