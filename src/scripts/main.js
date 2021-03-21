import GoogleMap from './map/map.js';
import Navigation from './navigation/navigation';
import Gallery from './gallery/gallery'

var placesApp = {
    googleMap:  new GoogleMap(),
    navigation: new Navigation(),
    gallery: new Gallery(),
    selectedLocationItem: {}
};

placesApp.googleMap.initMap()

