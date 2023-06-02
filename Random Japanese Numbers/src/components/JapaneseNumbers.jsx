import "bootstrap/dist/css/bootstrap.min.css";
import "../style/main.css";
import "../style/main-page.css";
import "../style/main-page-mobile.css";
import "../style/main-page-desktop.css";

import isMobile from "../functions/isMobile";
import { useState } from "react";
import GameModal from "./GameModal";
import { resizePage, setters } from "../functions/resize";
import { validateInputs } from "../functions/mainGenerator";

export const id_proyect = "-p003";

sessionStorage.removeItem("modal");

export default function JapaneseNumbers() {
  const [device, setDevice] = useState(isMobile() ? "mob" : "desk");
  const [numbType, setNumbType] = useState("int");
  const [modal, setModal] = useState("");

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  setters.push({
    set: setDevice,
    id: "main",
  });

  const validateMinMax = (value) => {
    if (isNaN(parseFloat(value))) {
      return "";
    }
    if (value < 0) {
      return "";
    }
    if (value > 999999999999) {
      return 999999999999;
    }
  };

  window.onresize = () => {
    resizePage();
  };

  return (
    <div>
      {modal}
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1
          className={`title${id_proyect} t-shadow-basic title-${device}${id_proyect}`}
        >
          JAPANESE NUMBER GENERATOR
        </h1>
        <div>
          <div>
            <label
              className={`label-inp${id_proyect} label-inp-${device}${id_proyect}`}
              htmlFor="min"
            >
              MIN
            </label>
            <br />
            <input
              onChange={(e) => {
                let num = validateMinMax(e.target.value);
                setMin(num);
              }}
              className={`inp${id_proyect} inp-${device}${id_proyect}`}
              type="number"
              name="min"
              value={min}
            />
          </div>
          <div>
            <label
              className={`label-inp${id_proyect} label-inp-${device}${id_proyect}`}
              htmlFor="max"
            >
              MAX
            </label>
            <br />
            <input
              onChange={(e) => {
                let num = validateMinMax(e.target.value);
                setMax(num);
              }}
              value={max}
              className={`inp${id_proyect} inp-${device}${id_proyect}`}
              type="number"
              name="max"
            />
          </div>
          <div>
            <button
              className={
                numbType === "int"
                  ? `btn-type${id_proyect} btn-type-selected${id_proyect} t-shadow-basic btn-type-${device}${id_proyect}`
                  : `btn-type${id_proyect}  t-shadow-basic btn-type-${device}${id_proyect}`
              }
              onClick={() => {
                setNumbType("int");
              }}
            >
              INT
            </button>
          </div>

        </div>
        <button
          onClick={() => {
            const inputs = document.getElementsByClassName(`inp${id_proyect}`);
            const values = {};
            for (let i = 0; i < inputs.length; i++) {
              values[inputs[i].name] = inputs[i].value;
            }
            values.type = numbType;
            const valitedValues = validateInputs(values);

            sessionStorage.setItem("modal", "true");

            setModal(<GameModal numbParams={valitedValues.value} />);
          }}
          className={`btn-play${id_proyect} btn-play-${device}${id_proyect}`}
        >
          PLAY
        </button>
      </div>
    </div>
  );
}
