import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: '800px',
  height: '500px',
  margin: '0px auto',
}

const mapDefaults = {
  center: {
    lat: 43.156578,
    lng: -77.608849,
  },
  zoom: 12,
}

export default function LocationPicker () {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    region: 'us',
    version: 'weekly',
    // other options
  })

  const [lat, setLat] = useState(mapDefaults.center.lat)
  const [lng, setLng] = useState(mapDefaults.center.lng)

  return isLoaded ? (
    <>
    <h1>@react-google-maps/api</h1>
    <p style={{
      textAlign: 'center',
      fontSize: '30px'
    }}>
      Lat: {lat}<br/> Lng: {lng} 
    </p>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapDefaults.center}
      zoom={mapDefaults.zoom}
      clickableIcons={false}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <Marker 
        position={mapDefaults.center}
        animation={'DROP'}
        label={'Move me'}
        draggable={true}
        onDragEnd={(e) => {
          setLat(e.latLng.lat());
          setLng(e.latLng.lng());
          // console.log(e.latLng.lat(),e.latLng.lng());
        }}
      />
    </GoogleMap>
    </>
  ) : loadError ? <p>{loadError}</p> : <p>Loading..</p>
}



