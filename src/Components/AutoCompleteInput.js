import { useEffect, useRef } from "react"
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 0.5rem;
  text-align: center;
`;

export default function AutoCompleteInput({type}) {
  const inputEl = useRef(null);

  useEffect(()=> {
    const options = {
      componentRestrictions: { country: "us" },
      fields: ["address_components", "geometry", "formatted_address"],
      types: type === 'cities' ? ["(cities)"] : ["address"],
    };
    const autocomplete = new window.google.maps.places.Autocomplete(inputEl.current, options)
    autocomplete.addListener('place_changed', () => {
      console.log(autocomplete.getPlace())
    })
  },[])

  return (
    <>
      <StyledInput 
        ref={inputEl} 
        type="text" 
        id="LocAuto" 
        placeholder={type === 'cities' ? 'City' : 'Address'} />
    </>
  )
}