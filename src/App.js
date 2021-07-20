
import { Route, Switch } from 'react-router';
import GoogleMap from './Pages/GoogleMap';
import LocationPicker from './Pages/LocationPicker';
import Map from './Pages/Map';
import MapComponent from './Pages/MapScriptOnly';
import SplashPage from './Pages/SplashPage';
import ThirdMap from './Pages/ThirdMap';
import { LocationContext } from './lib/LocationContext'
import { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Wrapper } from "@googlemaps/react-wrapper";

function App() {
  // const [google, setGoogle] = useState(null)
  const [location, setLocation] = useState({
    name: "Rochester, NY",
    coords: {
      lat: 43.156578,
      lng: -77.608849,
    },
  })

  const setLoc = (newLoc) => {
    setLocation(newLoc)
  }

  // useEffect(() => {
  //   const loader = new Loader({
  //     apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  //     version: "weekly",
  //   });

  //   loader.load()
  //   .then((google) => {
  //     setGoogle(google)
  //   })
  // }, [])

  return (
    <>
      <Wrapper 
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} 
        version="weekly"
        libraries={["places"]}
      >
        <LocationContext.Provider value={{location, setLoc}}>
          <Switch>
            <Route 
              path="/google"
              render={() => (
                <GoogleMap />
                )}
            />
            <Route 
              path="/third"
              render={() => (
                <ThirdMap />
                )}
            />
            <Route 
              path="/picker"
              render={() => (
                <LocationPicker />
                )}
            />
            <Route 
              path="/map"
              render={() => (
                <Map />
              )}
            />
            <Route 
              path="/"
              render={() => (
                <SplashPage />
                )}
                />
          </Switch>
        </LocationContext.Provider>
      </Wrapper>
    </>
  );
}

export default App;
