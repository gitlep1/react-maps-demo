import { useContext, useEffect } from "react";
import { LocationContext } from "../lib/LocationContext";

export default function GetCurrentLocation({setLocation}) {
  const locData = useContext(LocationContext)
  
  useEffect(() => {
    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = new window.google.maps.LatLng(
              position.coords.latitude, position.coords.longitude,
            );
            const geocoder = new window.google.maps.Geocoder()
            geocoder.geocode({ location: pos})
            .then((response) => {
              if (response.results[0]) {
                const city = response.results[0].address_components.find(comp => comp.types.includes('locality')).long_name
                const state = response.results[0].address_components.find(comp => comp.types.includes('administrative_area_level_1')).short_name
                const location = {
                  name: `${city}, ${state}`,
                  coords: pos
                }
                console.log("location", location, location.coords.lat())
                locData.setLoc(location)
                setLocation(location)
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
    }, 1000)
  })

  return <></>;
}