import { createContext, useContext } from "react";

export const ServerURLcontext = createContext();
export const getServerURL = () => useContext(ServerURLcontext);

const ServerURLProvider = ({ children }) => {
  const basicUrl = "http://localhost:4000/";

  return (
    <ServerURLcontext.Provider value={basicUrl}>
      {children}
    </ServerURLcontext.Provider>
  );
};


export default ServerURLProvider;