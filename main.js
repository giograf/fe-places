
function initMap () {
  map.initMap();
}

class GoogleMap {
  map = null;
  defaultLocation = { lat: -25.344, lng: 131.036 };z

  // Initialize and add the map
  initMap = () => {
    let location;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        location = {
          lng: position.coords.longitude,
          lat: position.coords.latitude
        }
        
        this.setInitialLocation(location)
      });
    } else {
      location = this.defaultLocation;
      this.setInitialLocation(this.defaultLocation)
    }
  }

  setInitialLocation = (location) => {
    console.log(location)
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: location,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: location,
      map: map,
    });
  }
}

const map = new GoogleMap();