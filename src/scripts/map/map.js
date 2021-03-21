import GoogleMapsApi from './mapApi';

export default class GoogleMap {
  apiKey = "AIzaSyDVMbWRaXOPflzrQG0RwoLncd_fTycXpQs";
  googleMapApi = new GoogleMapsApi(this.apiKey)
  map = null;
  defaultLocation = { lat: -25.344, lng: 131.036 };
  mapEl = document.querySelector("#map");
  zoom = 8;

  // Initialize and add the map
  initMap = async () => {
    let initialLocation = await this.getInitialGeoLocation();
    let mapEl = this.mapEl;
    this.googleMapApi.load().then(() => {
      this.renderMap(mapEl, initialLocation)
    });
  };

  renderMap(mapEl, initialLocation) {
    const options = {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: this.zoom,
      center: initialLocation,
      streetViewControl: false,
      disableDefaultUI: true
    }
  
    const map = new google.maps.Map(mapEl, options)
  
    this.renderMarker(map, initialLocation)
  }

  renderMarker(map, initialLocation) {
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: initialLocation,
      map: map,
    });
  }

  getInitialGeoLocation = async () => {
    if (navigator.geolocation) {
      let geoLocation;

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      geoLocation = {
        lng: position.coords.longitude,
        lat: position.coords.latitude,
      };

      // navigator.geolocation.getCurrentPosition((position) => {
      //   geoLocation = {
      //     lng: position.coords.longitude,
      //     lat: position.coords.latitude,
      //   };
      // });

        return geoLocation
      } else {
      return this.defaultLocation;
    }
  };
}
