//MAIN PAGE // LOGIN
import "../style/main page/logIn/manifiest.css";

import { useState } from "react";
import { getServerURL } from "../context/config/serverUrl";
import { logIn } from "../functions/credentials/logIn";
import { promiseHandler } from "../functions/promiseHandler";
import { getRestoData } from "../context/config/restoEnv";
import { useRezise } from "../context/config/resize";
import { getBackgrounds } from "../context/main page/background";
import random from "../functions/random";
import { center, left } from "../functions/aling";

export default function LogIn() {
  const serverUrl = getServerURL();
  const restoData = getRestoData();
  const device = useRezise();
  const backgrounds = getBackgrounds();
  const show_hide_icons = [
    "https://cdn.icon-icons.com/icons2/2065/PNG/512/view_show_icon_124811.png",
    "https://cdn.icon-icons.com/icons2/1791/PNG/512/break_114641.png",
  ];

  const [response, setResponse] = useState({});

  const instanceUrl = serverUrl + "logIn";

  const saveUserData = (data) => {
    if (data.status === 200) {
      setResponse(data.data);
    } else {
      console.log("FAIL");
    }
  };

  return (
    <div>
      <div
        className={"main-background"}
        style={{
          backgroundImage: `url("${
            backgrounds[
              random({
                min: 0,
                max: backgrounds.length,
              })
            ]
          }")`,
        }}
      >
        <h1 className={`main-title main-title-${device}`}>{restoData.name}</h1>
        <div style={center}>
          <div className={`main-box main-box-${device}`}>
            <div style={center}>
              <h2 className={`italic main-box-title-${device}`}>
                WELCOME TO {restoData.name.toUpperCase()}
              </h2>
              <h3 className={`italic tags-${device}`}>USERNAME</h3>

              <input className={`inp-basic main-input main-input-${device}`} />

              <h3 className={`italic tags-${device}`}>PASSWORD</h3>

              <div style={left}>
                <input
                  className={`inp-basic main-input main-input-${device} login-input-${device}`}
                />

                <button
                  className={`login-show-password login-show-password-${device}`}
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <h3>{response.name}</h3>
      <button
        onClick={() => {
          promiseHandler(
            logIn(instanceUrl, {
              name: "adolfito",
            }),
            saveUserData
          );
        }}
      >
        COSA
      </button> */}
    </div>
  );
}
