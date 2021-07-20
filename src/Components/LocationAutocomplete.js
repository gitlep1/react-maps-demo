import { Button } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import GooglePlacesAutoComplete, {geocodeByAddress} from 'react-google-places-autocomplete'
import styled from 'styled-components';

const Container = styled.div`
  margin: 1rem auto;
  width: 400px;
  display: flex;
  & > div:first-child {
    flex: 1;
  }
`;

export default function LocationAutoComplete({handleSubmit}) {
  const [value, setValue] = useState(null)
  const [coords, setCoords] = useState(null)

  useEffect(()=> {
    if (value?.label) {
      geocodeByAddress(value.label)
      .then(res => {
        setCoords({
          lat: res[0].geometry.location.lat(),
          lng: res[0].geometry.location.lng()
        })
      })
      .catch(err => {
        console.error(err)
      })
    }
  },[value])
  
  return (
    <Container>
      <div>
        <GooglePlacesAutoComplete
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          apiOption={{
            language: 'en',
            region: 'us',
          }}
          autocompletionRequest={{
            componentRestrictions: {
              country: ['us', 'ca']
            }
          }}
          minLengthAutocomplete={2}
          onLoadFailed={(error) => (
            console.error("Could not inject Google script", error)
          )}
          selectProps={{
            value,
            onChange: setValue,
            autoFocus: true,
            placeholder: 'City or Address'
          }}
        />
      </div>
      <Button
        disabled={value === null}
        onClick={()=> {
          handleSubmit({
            ...value,
            coords,
          })
        }}
      >
        Go
      </Button>
    </Container>
  )
}