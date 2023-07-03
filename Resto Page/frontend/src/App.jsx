import axios from "axios";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LogIn from "./pages/LogIn";
//SERVER URL
import ServerURLProvider from "./context/config/serverUrl";
//PARAMETERS OF THE RESTAURANT (NAME, )
import RestoProvider from "./context/config/restoEnv";
//ADAPTATIVE APP
import ResizeProvider from "./context/config/resize";
//BACKGROUNDS (ONLY MAIN PAGE)
import BackgroundProvider from "./context/main page/background";

// const Router = process.env.NODE_ENV === "development" ? BrowserRouter : HashRouter;

export default function App() {
  return (
    <div>
      <ResizeProvider>
        <RestoProvider>
          <ServerURLProvider>
            <Router>
              <BackgroundProvider>
                <Routes>
                  <Route exact strict path={"/"} element={<LogIn />} />
                </Routes>
                <Routes>
                  <Route exact strict path={"/login"} element={<LogIn />} />
                </Routes>
              </BackgroundProvider>
            </Router>
          </ServerURLProvider>
        </RestoProvider>
      </ResizeProvider>
    </div>
  );
}

// const basicUrl = "http://localhost:4000/";

// const createUser = async (data) => {
//   const response = await axios.post(
//     basicUrl + "login",
//     { pepi: data },
//     {
//       headers: {
//         authorization: "SERAN RASISTAS!",
//       },
//     }
//   );
// };

// const getData = async () => {
//   const response = await axios.get(basicUrl + "login");
//   setUser(response.data.name);
// };
