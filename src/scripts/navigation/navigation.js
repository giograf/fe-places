export default class Navigation {
    constructor() {
        this.mobileMenuContainerToggle = document.querySelector(".header__mobile-menu-toggle");
        this.mobileMenuContainer = document.querySelector(".places__gallery");
        this.mobileMenuOpen = false;

        this.openMobileMenuHandler();
    }

    openMobileMenuHandler = () => {
        this.mobileMenuContainerToggle.addEventListener('click', (event) => {
            if (this.mobileMenuOpen) {
                const locationItemFullViewContainer = document.querySelector(".location-item-full-view");
                const locationItemSubmissionContainer = document.querySelector(".location-item-submission-view");
                const locationItemEditViewContainer = document.querySelector(".location-item-edit-view");

                locationItemFullViewContainer.classList.remove('location-item-edit-view--open')
                locationItemFullViewContainer.classList.remove('location-item-full-view--open')
                locationItemSubmissionContainer.classList.remove('location-item-submission-view--open')
                this.mobileMenuContainer.classList.remove('places__gallery--open')
            } else {
                this.mobileMenuContainer.classList.add('places__gallery--open')
            }
            this.mobileMenuOpen = !this.mobileMenuOpen;
        });
    }
}