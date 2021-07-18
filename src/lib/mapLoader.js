import { Loader } from '@googlemaps/js-api-loader'
import MarkerClusterer from '@googlemaps/markerclustererplus';
import CouchIcon from '../Assets/couch.svg'
import { MAP_ID } from '../Data/mapId';

export default function mapLoader(markers, mapOptions) {
  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    version: "weekly",
  });

  loader
    .load()
    .then((google) => {

      const map = new google.maps.Map(document.getElementById("map"), {
        center: mapOptions.center,
        zoom: mapOptions.zoom,
        mapId: MAP_ID,
      });

      const googleMarkers = []
      for (const marker of markers) {
        const info = new google.maps.InfoWindow({
          content: marker.address,
        })
        const gMarker = new google.maps.Marker({
          position: marker.coords,
          // icon: CouchIcon,
          map: map,
        })
        gMarker.addListener('click', () => info.open({
          anchor: gMarker,
          map,
          shouldFocus: true,
        }))
        googleMarkers.push(gMarker);
      }
      const markerCluster = new MarkerClusterer(map, googleMarkers, {
        imagePath: "https://unpkg.com/@googlemaps/markerclustererplus@1.0.3/images/m",
      });
      console.log("markercluster", markerCluster)
    })
    .catch(e => {
      console.error(e);
    });
  }