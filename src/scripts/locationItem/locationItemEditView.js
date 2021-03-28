import LocationItem from './locationItem';

export default class LocationItemEditView extends LocationItem {
    constructor(gallery, item) {
        super(item);
        
        this.gallery = gallery;
    }

    editLocationItem = () => {
        this.locationItemApi.editLocationItem(this.item);
    }

    deleteLocationItem = () => {
        this.locationItemApi.deleteLocationItem(this.item);
    }
}
