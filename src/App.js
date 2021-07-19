
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
          path="/"
          render={() => (
            <MapComponent />
          )}
        />
      </Switch>
    </>
  );
}

export default App;
