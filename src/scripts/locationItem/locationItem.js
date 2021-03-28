import LocationItemApi from './locationItemApi';

export default class LocationItem {
    constructor(item) {
        this.item = {
            id: item ? item.id : null,
            title: item ? item.title : null,
            description: item ? item.description : null,
            openingHour: item ? item.openingHour : null,
            closingHour: item ? item.closingHour : null,
            geolocation: item ? item.geolocation : null,
            keywords: item ? item.keywords : null,
            favourite: item ? item.favourite : null,
            locationMarker: item ? item.marker : null
        }
        this.locationItemApi = new LocationItemApi();
    }

    removeItem = async () => {
        this.locationItemApi.removeItem(this.item)
    }

    removeKeyword = async (keyword) => {
        this.locationItemApi.removeKeyword(this.item, keyword)
    }

    editLocationItem = async (modifiedItem) => {
        this.locationItemApi.editItem(this.item, modifiedItem)
    }

    addLocationItem = async (newItem) => {
        this.locationItemApi.addItem(newItem)
    }

    getLocationItem = () => {
        return this.item;
    }
}