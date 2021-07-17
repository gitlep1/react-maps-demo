import GoogleMapReact from 'google-map-react'
import { useState } from 'react';
import styled from 'styled-components';
import Geocode from 'react-geocode';

const Marker = ({text}) => <div>{text}</div>

const AddressDiv = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 50px auto;
`;

const AddressInput = ({setMapCenter}) => {
  const [address, setAddress] = useState('');

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  Geocode.setLanguage("en");
  Geocode.setRegion("us");

  const getCoords = () => {
    Geocode.fromAddress(address).then(
      (response) => {
        const coords = response.results[0].geometry.location;
        console.log(coords);
        setMapCenter(coords);
      },
      (error) => {
        console.error(error);
      })
  }

  return (
    <AddressDiv>
      <input 
        type="text" 
        name="address"
        placeholder="Enter an address"
        onChange={(e) => setAddress(e.target.value)}
      />
      <button type="button" onClick={getCoords}>Center Map</button>
    </AddressDiv>
  )
}

const MapDiv = styled.div`
  width: 500px;
  height: 500px;
  margin: 0 auto;
`;

export default function GoogleMap() {
  const [mapCenter, setMapCenter] = useState({
    lat: 43.156578,
    lng: -77.608849,
  })

  const defaults = {
    center: {
      lat: 43.156578,
      lng: -77.608849,
    },
    zoom: 11,
  };

  const handleApiLoaded = (map, maps) => {
    console.log(map);
  };

  return (
    <>
      <AddressInput setMapCenter={setMapCenter} />
      <MapDiv>
        <GoogleMapReact 
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
          center={mapCenter}
          zoom={defaults.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          <Marker 
            lat={43.156578}
            lng={-77.608849}
            text="Free Table!"
          />
        </GoogleMapReact>
      </MapDiv>
    </>
  )

}