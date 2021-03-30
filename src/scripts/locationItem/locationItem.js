import LocationItemApi from './locationItemApi';

export default class LocationItem {
    constructor(item) {
        this.item = {
            id: item?.id,
            title: item?.title,
            description: item?.description,
            openingHour: item?.openingHour,
            closingHour: item?.closingHour,
            geolocation: item?.geolocation,
            keywords: item?.keywords,
            favourite: item?.favourite,
            locationMarker: item?.marker
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
        this.locationItemApi.addLocationItem(newItem)
    }

    getLocationItem = () => {
        return this.item;
    }
}