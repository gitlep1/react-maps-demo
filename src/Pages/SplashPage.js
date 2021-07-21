import { Button } from "@material-ui/core";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import streetchair from '../Assets/streetchair.jpg'
import AutoCompleteInput from "../Components/AutoCompleteInput";
import GetCurrentLocation from "../Components/GetCurrentLocation";
import SplashLocation from "../Components/SplashLocation";
import { LocationContext } from "../lib/LocationContext";

const SplashDiv = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  background-image: url(${streetchair});
  background-size: cover;
  background-position: center center;
`;

const TitleStyle = styled.h1`
  font-size: 7rem;
  margin: 4rem 0 3rem 0;
  color: #fefefe;
  text-shadow: #000 2px 2px 5px;
`;

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

export default function SplashPage(props) {
  const [location, setLocation] = useState({})

  return (
    <SplashDiv>
      <TitleStyle>Going Once!</TitleStyle>
      <GetCurrentLocation setLocation={setLocation} />
      <SplashLocation location={location} />
    </SplashDiv>
  )
}