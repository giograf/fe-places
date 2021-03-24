import LocationItemApi from './locationItemApi';

export default class LocationItem {
    constructor(item) {
        this.item = {
            id: item.id,
            title: item.title,
            description: item.description,
            openingHour: item.openingHour,
            closingHour: item.closingHour,
            geolocation: item.geolocation,
            keywords: item.keywords,
            favourite: item.favourite,
            locationMarker: item.marker ?? null
        }
        this.locationItemApi = new LocationItemApi();
    }

    removeItem = async () => {

    }

    removeKeyword = async (keyword) => {
        
    }

    editItem = async (modifiedItem) => {
        
    }

    addItem = async (newItem) => {
        
    }

    getItem = () => {
        return this.item;
    }
}