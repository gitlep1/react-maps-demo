import GoogleMapReact from 'google-map-react'
import { useState } from 'react';
import styled from 'styled-components';
import AddressInput from '../Components/AddressInput';
import Marker from '../Components/Marker';
import { rocData } from '../Data/rocData';


const MapDiv = styled.div`
  width: 800px;
  height: 500px;
  margin: 0 auto;
`;

export default function GoogleMap() {
  const defaults = {
    center: {
      lat: 43.156578,
      lng: -77.608849,
    },
    zoom: 11,
  };

  const [mapCenter, setMapCenter] = useState(defaults.center)
  const [markers, setMarkers] = useState([...rocData])
  
  const addMarker = (newMarker) => {
    setMarkers([...markers, newMarker])
  }

  const handleApiLoaded = (map, maps) => {
    // console.log(map)
    // map.panTo(mapCenter)
  };

  return (
    <>
      <AddressInput 
        setMapCenter={setMapCenter}
        addMarker={addMarker}
      />
      <MapDiv>
        <GoogleMapReact 
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
          center={mapCenter}
          zoom={defaults.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          {markers.map((marker) => (
            <Marker 
              lat={marker.coords.lat}
              lng={marker.coords.lng}
              address={marker.address}
            />
          ))}
        </GoogleMapReact>
      </MapDiv>
    </>
  )

}