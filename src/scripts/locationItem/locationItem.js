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

    }

    removeKeyword = async (keyword) => {
        
    }

    editLocationItem = async (modifiedItem) => {
        
    }

    addLocationItem = async (newItem) => {
        
    }

    getLocationItem = () => {
        return this.item;
    }
}