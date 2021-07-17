import { Loader } from '@googlemaps/js-api-loader'
import styled from 'styled-components';

const MapDiv = styled.div`
  width: 500px;
  height: 500px;
  margin: 100px auto;
`;

export default function MapComponent({apiKey}) {
  const mapOptions = {
    center: {
      lat: 43,
      lng: -77,
    },
    zoom: 8
  };

  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    version: "weekly",
  });

  loader
    .load()
    .then((google) => {
      new google.maps.Map(document.getElementById("map"), mapOptions);
    })
    .catch(e => {
      console.error(e);
    });

  // function initMap() {
  //   // The location of Uluru
  //   const uluru = { lat: -25.344, lng: 131.036 };
  //   // The map, centered at Uluru
  //   const map = new google.maps.Map(document.getElementById("map"), {
  //     zoom: 4,
  //     center: uluru,
  //   });
  //   // The marker, positioned at Uluru
  //   const marker = new google.maps.Marker({
  //     position: uluru,
  //     map: map,
  //   });
  // }

  return (
    <MapDiv id="map">Map?</MapDiv>
  )
}