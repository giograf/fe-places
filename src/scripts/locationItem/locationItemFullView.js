import LocationItemApi from './locationItemApi';

export default class LocationItemFullView {
    constructor(item) {
        this.item = {
            id: item.id,
            title: item.title,
            description: item.description,
            openingHour: item.openingHour,
            closingHour: item.closingHour,
            geolocation: item.geolocation,
            keywords: item.keywords,
            favourite: item.favourite
        }
        this.locationItemApi = new LocationItemApi();
    }

    removeItem = () => {

    }

    addKeyword = (keyword) => {
        
    }

    removeKeyword = (keyword) => {
        
    }

    editItem = (title, name, openingHour, closingHour, lat, lon) => {
        
    }

    setItem = (item) => {
        
    }

    getItem = () => {
        return this.item;
    }
}