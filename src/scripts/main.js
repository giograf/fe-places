import GoogleMap from './map/map.js';
import Navigation from './navigation/navigation';
import Gallery from './gallery/gallery'

class App {
    googleMap =  new GoogleMap();
    navigation = new Navigation();
    gallery = null;
}

var placesApp = new App();

placesApp.googleMap.initMap().then(() => {
    placesApp.gallery = new Gallery(placesApp.googleMap, placesApp.navigation)
})
