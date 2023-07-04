import { createContext, useContext, useState } from "react";
import isMobile from "../../functions/isMobile";

export const RezContext = createContext();
export const useRezise = () => useContext(RezContext);

const ResizeProvider = ({children}) => {
  const [device, setDevice] = useState(isMobile() ? "mob" : "desk");
  

const startAddon =(addon)=>{
switch(addon){
  case "zoom":

    break;
}  
}

const addons =()=>{
    let addonsID = JSON.parse(sessionStorage.getItem("addons"));  
    if(addonsID !== null && Array.isArray(addonsID)){
      addonsID = addonsID.split(",");
      addonsID.map(addon => {
        
      })
    }
  // switch(){
      
  //   }
}

  window.onresize = () => {
    addons();
    setDevice(isMobile() ? "mob" : "desk");
  };


  return <RezContext.Provider value={device}>{children}</RezContext.Provider>
};

export default ResizeProvider;
