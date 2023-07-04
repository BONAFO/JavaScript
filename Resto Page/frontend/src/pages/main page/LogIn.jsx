//MAIN PAGE // LOGIN
import "../../style/main page/logIn/manifiest.css";

import { useState } from "react";
import { getServerURL } from "../../context/config/serverUrl";
import { logIn, validateLogin } from "../../functions/credentials/logIn";
import { promiseHandler } from "../../functions/promiseHandler";
import { getRestoData } from "../../context/config/restoEnv";
import { useRezise } from "../../context/config/resize";
import { getBackgrounds } from "../../context/main page/background";
import random from "../../functions/random";
import { center, left } from "../../functions/aling";
import { gbid } from "../../functions/getDOM";
import { showMsj } from "../../components/Msj";
import executeMSJ from "../../functions/executeMsj";
import moveTo from "../../functions/moveTo";

export default function LogIn() {
  const serverUrl = getServerURL();
  const restoData = getRestoData();
  const device = useRezise();
  const backgrounds = getBackgrounds();
  const show_hide_icons = [
    "https://cdn.icon-icons.com/icons2/2065/PNG/512/view_show_icon_124811.png",
    "https://cdn.icon-icons.com/icons2/1791/PNG/512/break_114641.png",
  ];

  // const [response, setResponse] = useState({});
  const [backgroundIndex, setBackground] = useState(
    random({
      min: 0,
      max: backgrounds.length,
    })
  );
  const [passvisi, setPassVisibility] = useState(true);
  const [msj, setMjs] = useState("");

  const instanceUrl = serverUrl + "logIn";



  const validateResponse =(resp)=>{

    const response = {
     data:resp.data,
     status : resp.status

    };


    if(resp.status === 200){
      executeMSJ(showMsj, setMjs, {
        mjs: "FINE!!!!",
        type: "err",
      });
    }else{
      executeMSJ(showMsj, setMjs, {
        mjs: response.data.msj,
        type: "err",
      });
    }

    
  }

  return (
    <div>
      <div
        className={"main-background"}
        style={{
          backgroundImage: `url("${backgrounds[backgroundIndex]}")`,
        }}
      >
        <h1 className={`main-title main-title-${device}`}>{restoData.name}</h1>
        <div style={center}>
          <div className={`main-box main-box-${device}`}>
            <div style={center}>
              <h2 className={`italic main-box-title-${device}`}>
                WELCOME TO {restoData.name.toUpperCase()}
              </h2>
              <h3 className={`tag-basic tags-${device}`}>USERNAME</h3>

              <input
                id="input-username"
                placeholder="user / user@email.com"
                className={`inp-basic main-input main-input-${device}`}
              />

              <h3 className={`tag-basic tags-${device}`}>PASSWORD</h3>

              <div style={left}>
                <input
                  id="input-password"
                  type={passvisi ? "password" : "text"}
                  className={`inp-basic main-input main-input-${device} login-input-${device}`}
                />

                <button
                  onClick={() => {
                    setPassVisibility(!passvisi);
                  }}
                  style={{
                    backgroundImage: `url(${
                      passvisi ? show_hide_icons[0] : show_hide_icons[1]
                    })`,
                  }}
                  className={`login-show-password login-show-password-${device}`}
                ></button>
                <div>
                  <button
                    onClick={() => {
                      const userData = {
                        username: gbid("input-username").value.trim(),
                        password: gbid("input-password").value.trim(),
                      };

                      const dataValidated = validateLogin(userData);
                      if (dataValidated.bool) {
                        promiseHandler(
                          logIn(instanceUrl, userData),
                          validateResponse
                        );
                      } else {
                        executeMSJ(showMsj, setMjs, {
                          mjs: dataValidated.txt,
                          type: dataValidated.type,
                        });
                      }

                      // executeMSJ(showMsj, setMjs);

                      // showMsj();
                      // setMjs(<Msj msj={"ERROR PASSWORD AND/OR USERNAME INVALID"} type={"err"}></Msj>);

                      // setTimeout(() => {
                      //   setMjs("")
                      // }, 5500);
                    }}
                    className={`tag-basic login-btn-login login-btn-${device}`}
                  >
                    LOGIN
                  </button>
                  <br></br>
                  <button
                  onClick={()=>{
                    moveTo("./signup");
                  }}
                    className={`tag-basic login-btn-signup login-btn-${device}`}
                  >
                    CREATE ACCOUNT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {msj}

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
