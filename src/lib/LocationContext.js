import { createContext } from "react";

export const LocationContext = createContext({
  location: {
    name: '',
    coords: {},
  },
  setLocation: () => {},
})