import { createContext, useContext, useState } from "react";
import isMobile from "../../functions/isMobile";

export const RezContext = createContext();
export const useRezise = () => useContext(RezContext);

const ResizeProvider = ({children}) => {
  const [device, setDevice] = useState(isMobile() ? "mob" : "desk");

  window.onresize = () => {

    setDevice(isMobile() ? "mob" : "desk");
  };


  return <RezContext.Provider value={device}>{children}</RezContext.Provider>
};

export default ResizeProvider;
