import GoogleMapsApi from './mapApi';

export default class GoogleMap {
  apiKey = "AIzaSyDVMbWRaXOPflzrQG0RwoLncd_fTycXpQs";
  googleMapApi = new GoogleMapsApi(this.apiKey)
  map = null;
  defaultLocation = { lat: -25.344, lng: 131.036 };
  mapEl = document.querySelector("#map");
  zoom = 8;
  googleMapObject = null;

  // Initialize and add the map
  initMap = async () => {
    // Wait till user's location and maps load
    let initialLocation = await this.getInitialGeoLocation();
    await this.googleMapApi.load().then(() => {
      this.renderMap(initialLocation)
    });
  };

  renderMap(initialLocation) {
    this.googleMapObject = google;
    const options = {
      mapTypeId: this.googleMapObject.maps.MapTypeId.ROADMAP,
      zoom: this.zoom,
      center: initialLocation,
      streetViewControl: false,
      disableDefaultUI: true,
      mapId: "cacfe61a9beaf18c"
    }

    this.map = new this.googleMapObject.maps.Map(this.mapEl, options);
  }

  renderItemLocationMarker(itemLocation) {
    const marker = new this.googleMapObject.maps.Marker({
      position: itemLocation.geolocation,
      map: this.map
    });
  }

  renderItemLocationMarkers(itemLocations) {
    return itemLocations.map(itemLocation => {
      new this.googleMapObject.maps.Marker({
        position: itemLocation.geolocation,
        map: this.map
      });
    })
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

        return geoLocation
      } else {
        return this.defaultLocation;
    }
  };
}
