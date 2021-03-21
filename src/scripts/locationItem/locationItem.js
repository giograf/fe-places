import LocationItemApi from './locationItemApi';

export default class LocationItem {
    constructor() {
        item = {
            id: null,
            title: "",
            name: "",
            openingHour: "",
            closingHour: "",
            lat: null,
            lon: null,
            keywords: []
        }
        locationItemApi = new LocationItemApi();
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