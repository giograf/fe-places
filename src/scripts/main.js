import GoogleMap from './map/map.js';
import Navigation from './navigation/navigation';
import Gallery from './gallery/gallery'

class App {
    googleMap =  new GoogleMap();
    navigation = new Navigation();
    gallery = new Gallery();
}

var placesApp = new App();
placesApp.googleMap.initMap()
