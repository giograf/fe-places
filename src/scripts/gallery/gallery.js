import GalleryApi from './galleryApi';
import LocationItem from '../locationItem/locationItem';

export default class Gallery  {
    constructor() {
        this.galleryApi = new GalleryApi();
        this.galleryItems = this.galleryApi.getGalleryItems();
    }
}
