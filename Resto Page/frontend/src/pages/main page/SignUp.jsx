import "../../style/main page/signUp/manifiest.css";

import { useState } from "react";
import { useRezise } from "../../context/config/resize";
import { getRestoData } from "../../context/config/restoEnv";
import { getServerURL } from "../../context/config/serverUrl";
import { getBackgrounds } from "../../context/main page/background";
import random from "../../functions/random";
import { center, left } from "../../functions/aling";
import SUModule from "../../components/SignUpModule";
import moveTo from "../../functions/moveTo";
import { gbid } from "../../functions/getDOM";
import { validateNewUser } from "../../functions/credentials/signUp";

const getUserData = () => {
  return {
    username: (gbid(`input-username`).value).trim(),
    name:( gbid(`input-name`).value).trim(),
    phone: (gbid(`input-phone`).value === "") ? (false) : (Math.abs(parseInt((gbid(`input-phone`).value)))),
    email: (gbid(`input-email`).value).trim(),
    address: (gbid(`input-main address`).value).trim(),
    password: (gbid(`input-password`).value).trim(),
    repassword: (gbid(`input-repassword`).value).trim(),
  };
};

export default function SignUp() {
  const serverUrl = getServerURL();
  const restoData = getRestoData();
  const device = useRezise();
  const backgrounds = getBackgrounds();

  const show_hide_icons = [
    "https://cdn.icon-icons.com/icons2/2065/PNG/512/view_show_icon_124811.png",
    "https://cdn.icon-icons.com/icons2/1791/PNG/512/break_114641.png",
  ];

  const [backgroundIndex, setBackground] = useState(
    random({
      min: 0,
      max: backgrounds.length,
    })
  );

  const [passvisi, setPassVisibility] = useState(true);
  const [repassvisi, setRePassVisibility] = useState(true);
  const [msj, setMjs] = useState("");

  const instanceUrl = serverUrl + "logIn";

  return (
    <div>
      <div
        className={"main-background signup-main-background"}
        style={{
          backgroundImage: `url("${backgrounds[backgroundIndex]}")`,
        }}
      >
        <h1 className={`main-title main-title-${device}`}>{restoData.name}</h1>

        <div style={center}>
          <div
            className={`main-box main-box-${device} signup-main-box-${device}`}
          >
            <div style={center}>
              <h2 className={`italic main-box-title-${device} `}>
                WELCOME TO {restoData.name.toUpperCase()}
              </h2>

              <h3
                className={`tag-basic tags-${device} signup-tag-obli-${device}`}
              >
                FIELDS WITH * ARE OBLIGATORY
              </h3>

              {/* <h3 className={`tag-basic tags-${device}`}>USERNAME</h3>
              <input
                id="input-username"
                placeholder="user / user@email.com"
                className={`inp-basic main-input main-input-${device}`}
              /> */}
              <SUModule
                placeholder={""}
                tag={"username"}
                type={"text"}
              ></SUModule>
              <SUModule
                placeholder={"full name"}
                tag={"name"}
                type={"text"}
              ></SUModule>
              <SUModule
                placeholder={""}
                tag={"phone"}
                type={"number"}
              ></SUModule>
              <SUModule
                placeholder={""}
                tag={"email"}
                type={"email"}
              ></SUModule>
              <SUModule
                placeholder={""}
                tag={"main address"}
                type={"text"}
              ></SUModule>

              <h3 className={`tag-basic tags-${device}`}>PASSWORD</h3>

              <div style={left}>
                <input
                  id="input-password"
                  type={passvisi ? "password" : "text"}
                  className={`inp-basic main-input main-input-${device} signup-input-${device}`}
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
                  className={`signup-show-password signup-show-password-${device}`}
                ></button>
              </div>

              <h3 className={`tag-basic tags-${device}`}>REPEAT PASSWORD</h3>

              <div style={left}>
                <input
                  id="input-repassword"
                  type={repassvisi ? "password" : "text"}
                  className={`inp-basic main-input main-input-${device} signup-input-${device}`}
                />

                <button
                  onClick={() => {
                    setRePassVisibility(!repassvisi);
                  }}
                  style={{
                    backgroundImage: `url(${
                      repassvisi ? show_hide_icons[0] : show_hide_icons[1]
                    })`,
                  }}
                  className={`login-show-password signup-show-password-${device}`}
                ></button>
              </div>

              <button
                onClick={() => {

                    const userData = getUserData ();
                    validateNewUser(userData);
                }}
                className={`tag-basic signup-btn-signup signup-btn-${device}`}
              >
                SIGNUP
              </button>

              <button
                onClick={() => {
                    moveTo("./login")
                }}
                className={`tag-basic login-btn-signup login-btn-${device}`}
              >
                LOGIN
              </button>

              <button
                onClick={() => {
                  gbid(`input-username`).value = "";
                  gbid(`input-name`).value = "";
                  gbid(`input-phone`).value = "";
                  gbid(`input-email`).value = "";
                  gbid(`input-main address`).value = "";
                  gbid(`input-password`).value = "";
                  gbid(`input-repassword`).value = "";
                }}
    
                className={`tag-basic signup-btn-clear login-btn-${device}`}
              >
                CLEAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
