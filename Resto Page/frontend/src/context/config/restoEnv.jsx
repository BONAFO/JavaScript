import { createContext, useContext } from "react";

export const RestoContext = createContext();
export const getRestoData = () => useContext(RestoContext);

const RestoProvider = ({ children }) => {
  const restoData = {
    name : "Naomi Resto"
  };

  return <RestoContext.Provider value={restoData}>{children}</RestoContext.Provider>;
};

export default RestoProvider;