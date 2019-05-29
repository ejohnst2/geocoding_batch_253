import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


// this function sets the boundaries of the map
// fits those boundaries to the map element on the page
const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15 });
};

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    // creating new instance of MapBox map
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/ejohnst2/cjw8ml1mj09rn1bs65vybctqg'
    });
    // create new variable for markers, from the data in HTML
    const markers = JSON.parse(mapElement.dataset.markers);
    markers.forEach((marker) => {
     // create a new instance of MB popup based on info window
     const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);
      new mapboxgl.Marker()
        .setLngLat([ marker.lng, marker.lat ])
        .setPopup(popup)
        .addTo(map);
    });
    fitMapToMarkers(map, markers);
    // adding the geocoder search to the map
    map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken }));
  }
};

export { initMapbox };
