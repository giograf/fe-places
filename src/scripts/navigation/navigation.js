export default class Navigation {
    constructor() {
        this.mobileMenuContainerToggle = document.querySelector(".header__mobile-menu-toggle");
        this.mobileMenuContainer = document.querySelector(".places__gallery");
        this.mobileMenuOpen = false;
        // this.locationItemEditViewContainerOpener = document.querySelector(".gallery__location-item")
        // this.locationItemEditViewContainerCloser = document.querySelector(".location-item-edit-view__close")
        // this.locationItemEditViewContiner = document.querySelector(".location-item-edit-view");
        // this.locationItemEditViewOpen = false;

        this.openMobileMenuHandler();
    }

    openMobileMenuHandler = () => {
        this.mobileMenuContainerToggle.addEventListener('click', (event) => {
            this.mobileMenuOpen ? 
                this.mobileMenuContainer.classList.remove('places__gallery--open'):
                this.mobileMenuContainer.classList.add('places__gallery--open');
            this.mobileMenuOpen = !this.mobileMenuOpen;
        });
    }

    openLocationItemEditView = () => {
        const locationItemEditViewContainer = document.querySelector(".location-item-edit-view");
        locationItemEditViewContainer.classList.add('location-item-edit-view--open');
        this.locationItemFullViewOpen = true;

        this.locationItemFullViewCloseHandler();
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