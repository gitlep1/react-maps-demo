import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer, InfoWindow } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import AddressInput from "../Components/AddressInput";
import { rocData } from "../Data/rocData";
import CouchIcon from '../Assets/couch.svg'

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

export default function ThirdMap () {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    region: 'us',
    version: 'weekly',
    // other options
  })

  const [mapCenter, setMapCenter] = useState(mapDefaults.center);
  const [markers, setMarkers] = useState([...rocData])
  const [addressDisplay, setAddressDisplay] = useState('')
  
  const addMarker = (newMarker) => {
    setMarkers([...markers, newMarker])
  }

  const [map, setMap] = useState(null)
  // load google.map object into state on map load so we can use it
  // useCallback so we can use the same function on rerender
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    console.log("bounds",bounds)
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  useEffect(() => {
    map?.panTo(mapCenter)
  }, [mapCenter, map])

  return isLoaded ? (
    <>
    <h1>@react-google-maps/api</h1>
    <AddressInput 
      setMapCenter={setMapCenter}
      addMarker={addMarker}
      addressDisplay={addressDisplay}
    />
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapDefaults.center}
      zoom={mapDefaults.zoom}
      clickableIcons={false}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <MarkerClusterer options={{
        imagePath: "https://unpkg.com/@googlemaps/markerclustererplus@1.0.3/images/m",
        // minimumClusterSize: 5
      }}>
        {(clusterer) =>
          markers.map(marker => (
            <Marker 
              key={`${marker.address}${marker.coords.lng}`}
              position={marker.coords}
              clusterer={clusterer}
              // icon={CouchIcon}
              // label={'!'}
              // title={"Blah"}
              onClick={()=> setAddressDisplay(marker.address)}
            >
            </Marker>
          ))}
      </MarkerClusterer>
    </GoogleMap>
    </>
  ) : loadError ? <p>{loadError}</p> : <p>Loading..</p>
}



