import { createContext } from "react";

export const LocationContext = createContext({
  name: 'default',
  coords: {},
  setLoc: () => {},
})