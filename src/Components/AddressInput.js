import { useState, useEffect} from "react";
import Geocode from 'react-geocode';
import styled from 'styled-components';

const AddressDiv = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 25px auto;
  font-size: 1.2rem;
  input, button {
    font-size: 1rem;
    padding: 0.5rem;
    margin-top: 0.25rem;
  }
  button {
    font-size: 1rem;
    padding: 0.5rem;
    margin: 0.5rem;
  }
`;

export default function AddressInput ({setMapCenter, addMarker, addressDisplay}) {
  const [address, setAddress] = useState(addressDisplay);

  useEffect(() => {
    setAddress(addressDisplay)
  },[addressDisplay])

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  Geocode.setLanguage("en");
  Geocode.setRegion("us");

  const getCoordsSetCenter = () => {
    Geocode.fromAddress(address).then(
      (response) => {
        const coords = response.results[0].geometry.location;
        // console.log(response);
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
        const address = response.results[0].formatted_address;
        console.log(coords)
        addMarker({
          address,
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
        value={address}
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