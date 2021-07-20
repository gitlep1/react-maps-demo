import { Button } from "@material-ui/core";
import { useContext } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { LocationContext } from "../lib/LocationContext";
import AutoCompleteInput from "./AutoCompleteInput";

const LocationBox= styled.div`
  max-width: max-content;
  text-align: center;
  background-color: rgba(255,255,255,0.8);
  border-radius: 2rem;
  padding: 2rem 4rem;
  h1 {
    font-size: 2rem;
    margin: 0.5rem 0 1rem 0;
  }
  div {
    display: flex;
    justify-content: center;
    input {
      font-size: 1rem;
    }
  }
`;

export default function SplashLocation({location}) {
  const locData = useContext(LocationContext)
  const history = useHistory();

  // const handleSubmit = (value) => {
  //   locData.setLoc({
  //     name: value.label,
  //     coords: value.coords,
  //   })
  //   history.push('/map')
  // }

  return (
    <LocationBox>
      <h1>What's your Nearest City?</h1>
      <div>
        <AutoCompleteInput
          location={location}
          type="cities"
        />
        <Button
          onClick={() => {
            history.push('/map')
          }}
        >
          Go
        </Button>
      </div>
    </LocationBox>
  );


}