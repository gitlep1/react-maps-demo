import { Status, Wrapper } from "@googlemaps/react-wrapper";
import styled from "styled-components";
import streetchair from '../Assets/streetchair.jpg'
import SplashLocation from "../Components/SplashLocation";

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

// const apiMapsLoaded = () => {
//   if (Status.LOADING) return <p>Loading...</p>;
// }

export default function SplashPage(props) {
  return (
    <SplashDiv>
      <TitleStyle>Going Once!</TitleStyle>
        <SplashLocation />
    </SplashDiv>
  )
}