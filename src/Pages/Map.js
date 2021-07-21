import { useContext, useEffect } from "react";
import styled from "styled-components";
import AutoCompleteInput from "../Components/AutoCompleteInput";
import MapComponent from "../Components/MapComponent";
import { LocationContext } from "../lib/LocationContext";

const MapDiv = styled.div`
  width: 800px;
  height: 500px;
  margin: 0 auto;
`;

export default function Map({google}) {
  const locData = useContext(LocationContext)

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: locData.location.coords,
      zoom: 12,
      // mapId: MAP_ID,
    });
  },[])


  return (
    <>
      <p>{locData.location.name}</p>
      <p>{locData.location.coords.lat()}</p>
      <p>{locData.location.coords.lng()}</p>
      <MapDiv id="map">Loading...</MapDiv>
    </>
  );
}