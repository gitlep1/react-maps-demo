import { useState } from "react";
import Geocode from 'react-geocode';
import styled from 'styled-components';


const AddressDiv = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 25px auto;
  input {
    font-size: 1rem;
    padding: 0.5rem;
  }
  button {
    font-size: 1rem;
    padding: 0.5rem;
    margin: 0.5rem;
  }
`;

export default function AddressInput ({setMapCenter, addMarker}) {
  const [address, setAddress] = useState('');

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  Geocode.setLanguage("en");
  Geocode.setRegion("us");

  const getCoordsSetCenter = () => {
    Geocode.fromAddress(address).then(
      (response) => {
        const coords = response.results[0].geometry.location;
        // console.log(response);
        const title = response.results[0].formatted_address;
        console.log(title);
        setMapCenter(coords);
      },
      (error) => {
        console.error(error);
      })
  }

  const getCoordsAddMarker = () => {
    Geocode.fromAddress(address).then(
      (response) => {
        const coords = response.results[0].geometry.location;
        console.log(coords)
        const title = response.results[0].formatted_address;
        addMarker({
          title,
          coords
        })
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
      <div>
        <button type="button" onClick={getCoordsSetCenter}>Center Map</button>
        <button type="button" onClick={getCoordsAddMarker}>Add Marker</button>
      </div>
    </AddressDiv>
  )
}