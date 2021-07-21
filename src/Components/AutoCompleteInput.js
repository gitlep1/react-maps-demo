import { useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components";
import { LocationContext } from "../lib/LocationContext";

const StyledInput = styled.input`
  padding: 0.5rem;
  text-align: center;
`;

export default function AutoCompleteInput({type, location}) {
  const inputEl = useRef(null);
  const locData = useContext(LocationContext);

  const [input, setInput] = useState(location?.name || '');

  useEffect(() => {
    setInput(location?.name)
  },[location])

  useEffect(()=> {
    const options = {
      componentRestrictions: { country: "us" },
      fields: ["address_components", "geometry", "formatted_address"],
      types: type === 'cities' ? ["(cities)"] : ["address"],
    };
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputEl.current, options)
    autocomplete.addListener('place_changed', () => {
      const res = autocomplete.getPlace();
      console.log(res)
      const city = res.address_components.find(comp => comp.types.includes('locality')).long_name
      const state = res.address_components.find(comp => comp.types.includes('administrative_area_level_1')).short_name
      const pos = res.geometry.location
      const location = {
        name: `${city}, ${state}`,
        coords: pos
      }
      console.log(location)
      setInput(res.formatted_address)
      locData.setLoc(location)
    })
  },[])

  return (
    <>
      <StyledInput 
        ref={inputEl} 
        type="text"
        value={input || ''}
        onChange={(e) => setInput(e.target.value)}
        id="LocAutoComplete" 
        placeholder={`Enter ${type === 'cities' ? 'a City' : 'an Address'}`} />
    </>
  )
}