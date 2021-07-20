import { useState } from 'react';
import styled from 'styled-components';
import AddressInput from '../Components/AddressInput';
import { rocData } from '../Data/rocData';
import mapLoader from '../lib/mapLoader';

// Map container, needs explicit width
const MapDiv = styled.div`
  width: 800px;
  height: 500px;
  margin: 0 auto;
`;

export default function MapScriptOnly({apiKey}) {
  // initial map defaults
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

  mapLoader(markers, {
    center: mapCenter,
    zoom: defaults.zoom,
  })

  return (     
    <>
      <h1>google js api, no package</h1>
      <AddressInput 
        setMapCenter={setMapCenter}
        addMarker={addMarker}
      />
      <MapDiv id="map">Loading...</MapDiv>
    </>
  )
}