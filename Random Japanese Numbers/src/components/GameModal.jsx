import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { id_proyect } from "./JapaneseNumbers";
import "../style/modal-page.css";
import "../style/modal-page-mobile.css";
import "../style/modal-page-desktop.css";
import isMobile from "../functions/isMobile";
import { deletePage, setters } from "../functions/resize";
import { generator } from "../functions/mainGenerator";
import { traslateNumber } from "../functions/japaneseConvert";

const dataColector = (numbParams) => {
  const dataNumber = {
    value: generator(numbParams),
  };
  return dataNumber;
};

const convertToJapaneseNumberDivision = (number) => {
  number = number.toString().split("").reverse();
  for (let i = 0; i < number.length; i++) {
    if (i !== 0 && (i + 1) % 4 === 0 && i + 1 !== number.length) {
      number[i] = "." + number[i];
    }
  }
  return number
};

export default function GameModal({ numbParams }) {
  const [open, setOpen] = React.useState(false);
  const [valueInp, setInp] = React.useState("");
  const [device, setDevice] = React.useState(isMobile() ? "mob" : "desk");
  const [number, setNumber] = React.useState(dataColector(numbParams));
  const handleOpen = () => {
    if (sessionStorage.getItem("modal") === "true") {
      sessionStorage.setItem("modal", "false");
      setOpen(true);
    }
  };
  const handleClose = () => {
    sessionStorage.removeItem("modal");
    deletePage("game-modal");
    setInp("");
    setOpen(false);
  };

  setters.push({
    set: setDevice,
    id: "game-modal",
  });

  return (
    <div>
      {handleOpen()}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={`modal${id_proyect} modal-${device}${id_proyect}`}>
          <div>
            <button
              className={`back-btn${id_proyect} back-btn-${device}${id_proyect} t-shadow-blacked rounded`}
              onClick={handleClose}
            >
              {"<="}
            </button>

            <h3
              className={`number${id_proyect} number-${device}${id_proyect} t-shadow-blacked`}
            >
              {convertToJapaneseNumberDivision(number.value)}
            </h3>

            <div>
              <h3
                id="kanji"
                className={`text-msj${id_proyect} text-msj-${device}${id_proyect} t-shadow-blacked`}
              >
                {traslateNumber(number.value).kanji}
              </h3>
              <h3
                id="romanji"
                className={`text-msj${id_proyect} romaji-text-${device}${id_proyect} text-msj-${device}${id_proyect} t-shadow-blacked`}
              >
                {traslateNumber(number.value).romanji}
              </h3>
            </div>
            <div>
              <input
                className={`inp-modal${id_proyect} inp-modal-${device}${id_proyect}`}
                id="inp-aswn"
                type="text"
                onChange={(e) => {
                  setInp(e.target.value.toUpperCase());
                }}
                value={valueInp}
              />
              <div>
                <button
                  onClick={() => {
                    if (
                      document.getElementById("kanji") !== undefined &&
                      document.getElementById("romanji") !== undefined
                    ) {
                      
                      const userAnswer = document.getElementById("inp-aswn").value;
                      const answer = document.getElementById("romanji").textContent;
                      if(answer.toLowerCase().trim() === userAnswer.toLowerCase().trim()){
                        document.getElementById("romanji").style.color = "green";
                      }else{
                        document.getElementById("romanji").style.color = "red";
                      }

                      console.log(userAnswer);
                      document.getElementById("kanji").style.opacity = 1;
                      document.getElementById("romanji").style.opacity = 1;
                      
                    }
                  }}
                  className={`btn-modal${id_proyect} btn-modal-next${id_proyect} btn-modal-next-${device}${id_proyect} btn-modal-${device}${id_proyect}`}
                >
                  SHOW
                </button>
                <button
                  onClick={() => {
                    if (
                      document.getElementById("kanji") !== undefined &&
                      document.getElementById("romanji") !== undefined
                    ) {
                      document.getElementById("kanji").style.opacity = 0;
                      document.getElementById("romanji").style.opacity = 0;
                    }

                    setNumber(dataColector(numbParams));
                  }}
                  className={`btn-modal${id_proyect} btn-modal-show${id_proyect} btn-modal-show-${device}${id_proyect} btn-modal-${device}${id_proyect}`}
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
