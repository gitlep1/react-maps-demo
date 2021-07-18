
import { Route, Switch } from 'react-router';

import './App.css';
import GoogleMap from './Pages/GoogleMap';
import LocationPicker from './Pages/LocationPicker';
import MapComponent from './Pages/MapComponent';
import ThirdMap from './Pages/ThirdMap';

function App() {
  return (
    <>
      <Switch>
        <Route 
          path="/google"
          render={() => (
            <MapComponent />
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
          path="/"
          render={() => (
            <GoogleMap />
          )}
        />
      </Switch>
    </>
  );
}

export default App;
