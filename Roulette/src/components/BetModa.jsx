import * as React from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import isMobile from "../functions/isMobile";
import "../style/modal-style-desktop.css";
import "../style/modal-style-mobile.css";
import {
  calculateDeb,
  deleteBet,
  getBetByID,
  makeAbet,
  validateBet,
} from "../functions/betSystem";

import { userdata } from "./Roulette";
const style = {
  position: "absolute",
  top: isMobile() ? "30%" : "40%",
  left: isMobile() ? "50%" : "40%",
  transform: "translate(-50%, -50%)",
  width: isMobile() ? "100%" : "55%",
  height: isMobile() ? "45vh" : "65vh",
  background: `linear-gradient(90deg,
    rgba(42, 41, 41, 1) 0%,
    rgba(34, 34, 34, 1) 10%,
    rgba(32, 32, 32, 1) 20%,
    rgba(29, 29, 29, 1) 30%,
    rgba(0, 0, 0, 1) 50%,
    rgba(29, 29, 29, 1) 70%,
    rgba(32, 32, 32, 1) 80%,
    rgba(34, 34, 34, 1) 90%,
    rgba(42, 41, 41, 1) 100%)`,

  boxShadow: 24,
  borderRadius: isMobile() ? "0%" : "1%",
  padding: isMobile() ? "5% 0%" : "2.5% 5%",
};

export default function BetModal({ numb, setBets }) {
  const [open, setOpen] = React.useState(false);
  const [valueInp, setValue] = React.useState(0);
  const handleOpen = () => {
    if (sessionStorage.getItem("modal") === "true") {
      sessionStorage.setItem("modal", "false");
      setValue(betData.data.money);
      setOpen(true);
    }
  };
  const handleClose = () => {
    sessionStorage.removeItem("modal");
    setOpen(false);
  };

  let betData = getBetByID(numb, setBets[0]);
  if (!betData.bool) {
    betData.data = {
      id: numb,
      money: 0,
    };
  }

  return (
    <div>
      {handleOpen()}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className={isMobile() ? "modal-titl-mob text-modal text-font" : "modal-titl-desk text-modal text-font"}>
            {numb}
            <span className="text-deb-color">
              {betData.data.money < 999999999999
                ? `[$${betData.data.money}]`
                : "[+$999999999999]"}
            </span>
          </h1>
          <button
            className={
              isMobile()
                ? "btn-basic-mob btn-clear-mob btn-back"
                : "btn-basic-desk btn-clear-desk btn-back"
            }
            onClick={() => {
              deleteBet(numb, setBets);
              handleClose();
            }}
          >
            DELETE BET
          </button>
          <br />
          <h3 className={isMobile() ? "your-money-mob text-modal text-font" : "your-money-desk text-modal text-font"}>
            MONEY TO USE: <span className="text-money-color">${userdata.money - calculateDeb(setBets[0])}</span>
          </h3>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <input
              className={isMobile() ? "input-mob input-style" : "input-desk input-style"}
              type="number"
              onChange={(e) => {
                setValue(parseInt(e.target.value));
              }}
              id="modal-input"
              value={valueInp}
              placeholder="0"
            />
            <button
              className={isMobile() ? "btn-basic-mob btn-play" : "btn-basic-desk btn-play"}
              onClick={() => {
                const bet = parseInt(
                  document.getElementById("modal-input").value
                );
                if (!isNaN(bet)) {
                  const newBet = betData.data;
                  newBet.money = validateBet(bet, setBets[0], newBet.id);

                  makeAbet(newBet, setBets);
                  handleClose();

                }
              }}
            >
              SAVE
            </button>
          </div>
          <br />
          <button
            className={
              isMobile()
                ? "btn-basic-mob btn-exit-mob btn-back"
                : "btn-basic-desk btn-exit-desk btn-back"
            }
            onClick={handleClose}
          >
            CLOSE
          </button>
        </Box>
      </Modal>
    </div>
  );
}
