import { useContext, useEffect } from "react";
import { LocationContext } from "../lib/LocationContext";

export default function GetCurrentLocation({setLocation}) {
  const locData = useContext(LocationContext)
  
  useEffect(() => {
    // time to wait
    const DELAY = 1000;
    setTimeout(() => {
      // use HTML location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // create google LatLng object with coordinates
            const pos = new window.google.maps.LatLng(
              position.coords.latitude, position.coords.longitude,
            );
            // load google geocoder service, pass in coordinates
            const geocoder = new window.google.maps.Geocoder()
            geocoder.geocode({ location: pos})
            .then((response) => {
              console.log("response", response)
              if (response.results[0]) {
                const { address_components } = response.results[0]
                const city = address_components?.find(
                  (comp) => (
                    comp.types.includes('locality') 
                    || comp.types.includes('sublocality')
                  ))?.long_name
                const state = address_components?.find(
                  (comp) => 
                    comp.types.includes('administrative_area_level_1'))?.short_name
                if(city && state && pos) {
                  const location = {
                    name: `${city}, ${state}`,
                    coords: pos
                  }
                  console.log("location found", location)
                  locData.setLoc(location)
                  setLocation(location)
                }
              } else {
                console.log("No locations found")
              }
            })
          },
          () => {
            console.log("Geolocation service error")
          }
        );
      } else {
        // Browser doesn't support Geolocation
        console.log("Your browser does not support Geolocation")
      }
    }, DELAY)
  }, [])

  return <></>;
}