import "../style/main.css";
import "../style/style.css";
import "../style/game-style-desktop.css";
import "../style/game-style-mobile.css";
import "../style/common-style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import isMobile from "../functions/isMobile";
import { useState } from "react";
import NumbersRult from "./NumbersRult";
import { autoSave, spinRoulette } from "../functions/rouletteSystem";
import { resetAllBtnsColor } from "../functions/betSystem";

export const slot = 1;

const loadGame = () => {
  const save = localStorage.getItem(`roulette-save-slt-${slot}`);
  if (save != null) {
    return JSON.parse(save);
  } else {
    const newSave = {
      money: 1000,
    };
    autoSave(newSave, slot);
    return newSave
  }
};

export const userdata = loadGame();

export let export_bets = 0;
// export let bets = [];
// sessionStorage.removeItem("modal");

// export const setBets = (netBets) => {
//   bets = netBets;
// };

export const black = [
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
];

export default function Roulette() {
  const [modal, setModal] = useState("");
  const [bets, setBets] = useState([]);
  export_bets = bets;
  // <h3 className={isMobile() ? "coin-mob" : "coin-desk"}></h3>

  const selectCoin = () => {};

  const addNumberButton = () => {
    const button = [];
    for (let i = 0; i < 36; i++) {
      if (i === 0) {
        button.push(
          <NumbersRult
            setModal={setModal}
            setBets={[bets, setBets]}
            key={"btn-numb-" + i}
            content={0}
            styles={{
              div: { display: "inline" },
            }}
            classesDesk={{
              btn: "number-0-desk basic-number-desk btn-0-numb numb-font",
            }}
            classesMob={{
              btn: "basic-number-mob number-0-mob btn-0-numb numb-font",
            }}
          ></NumbersRult>
        );
      } else if (black.filter((blkn) => blkn === i).length !== 0) {
        button.push(
          <NumbersRult
            setModal={setModal}
            setBets={[bets, setBets]}
            key={"btn-numb-" + i}
            content={i}
            styles={{
              div: { display: "inline" },
            }}
            classesDesk={{
              btn: "basic-number-desk btn-black-numb numb-font",
            }}
            classesMob={{
              btn: "basic-number-mob btn-black-numb numb-font",
            }}
          ></NumbersRult>
        );
      } else {
        button.push(
          <NumbersRult
            setModal={setModal}
            setBets={[bets, setBets]}
            key={"btn-numb-" + i}
            content={i}
            styles={{
              div: { display: "inline" },
            }}
            classesDesk={{
              btn: "basic-number-desk btn-red-numb numb-font",
            }}
            classesMob={{
              btn: "basic-number-mob btn-red-numb numb-font",
            }}
          ></NumbersRult>

          // <div
          //   onClick={() => {
          //     makeAbet(i, {
          //       bet: bet,
          //       set: setBet,
          //     });
          //   }}
          //   style={{
          //     display: "inline-block",
          //   }}
          // >
          //   <div className={isMobile() ? "coin-cont-mob" : "coin-cont-desk"}>
          //     <h3
          //       id={`coin-${i}`}
          //       className={isMobile() ? "coin-mob" : "coin-desk"}
          //     ></h3>
          //   </div>
          //   <button
          //     key={"btn-numb-" + i}
          //     className={isMobile() ? "basic-number-mob " : "basic-number-desk"}
          //     style={{ backgroundColor: "#e98282", color: "black" }}
          //   >
          //     {i}
          //   </button>
          // </div>
        );
      }
    }
    return button;
  };
  return (
    <div>
      {modal}
      <div
        className={
          isMobile() ? "command-container-mob" : "command-container-desk"
        }
      >
        {/* <div
          style={{
            height: "100%",
            width: "100%",
            backgroundPosition: "top",
            backgroundImage:
              "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sona_6.jpg')",
          }}
        > */}
        <div>
          <img src="" alt="" />
          <button
            className={
              isMobile()
                ? "cmdbtn-mob cmd-rules-mob rounded btn-rules btn-cmd-basic cmd-font"
                : "cmdbtn-desk cmd-rules-desk rounded btn-rules btn-cmd-basic cmd-font"
            }
            onClick={() => {
       
            }}
          >
            RULES
          </button>

          <button
            className={
              isMobile()
                ? "cmdbtn-mob cmd-play-mob rounded btn-play btn-cmd-basic cmd-font"
                : "cmdbtn-desk cmd-play-desk rounded btn-play btn-cmd-basic cmd-font"
            }
            onClick={() => {
              spinRoulette();
              resetAllBtnsColor()
              document.getElementById(
                "user-money"
              ).textContent = `$${userdata.money}(-$0)`;
              setBets([]);
            }}
          >
            SPIN!
          </button>

          <button
            className={
              isMobile()
                ? "cmdbtn-mob cmd-back-mob rounded btn-back btn-cmd-basic cmd-font"
                : "cmdbtn-desk cmd-back-desk rounded btn-back btn-cmd-basic cmd-font"
            }
          >
            BACK
          </button>
          <h3
            id="user-money"
            className={isMobile() ? "money-mob rounded" : "money-desk rounded"}
          >
            ${userdata.money}(-$0)
          </h3>

          <div
            className={
              isMobile()
                ? "winner-cont-mob rounded"
                : "winner-cont-desk rounded"
            }
          >
            <h3
              className={
                isMobile()
                  ? "winner-txt-mob winner-basic-mob"
                  : "winner-txt-desk winner-basic-desk"
              }
            >
              WINNER:
            </h3>
            <h3
              id="winner-tag"
              className={
                isMobile()
                  ? "winner-basic-mob winner-numb-mob"
                  : "winner-basic-desk winner-numb-desk"
              }
            ></h3>
          </div>
        </div>
      </div>

      <div>
        <div className={isMobile() ? "num-cont-mob" : "num-cont-desk"}>
          {addNumberButton()}

          <NumbersRult
            setModal={setModal}
            setBets={[bets, setBets]}
            key={"btn-numb-" + 36}
            content={36}
            styles={{
              div: { display: "inline" },
              btn: { backgroundColor: "#e98282", color: "black" },
            }}
            classesDesk={{
              btn: "basic-number-desk numb-font",
            }}
            classesMob={{
              btn: "basic-number-mob numb-font",
            }}
          ></NumbersRult>

          <NumbersRult
            setModal={setModal}
            setBets={[bets, setBets]}
            key={"btn-numb-" + "1-12"}
            content={"1-12"}
            styles={{
              div: { display: "inline" },
            }}
            classesMob={{
              btn: "basic-number-mob  bnd-num-mob btn-grp-numb numb-font",
            }}
            classesDesk={{
              btn: "basic-number-desk  bnd-num-desk btn-grp-numb numb-font",
            }}
          ></NumbersRult>

          <NumbersRult
            setModal={setModal}
            setBets={[bets, setBets]}
            key={"btn-numb-" + "13-24"}
            content={"13-24"}
            styles={{
              div: { display: "inline" },
            }}
            classesMob={{
              btn: "basic-number-mob  bnd-num-mob btn-grp-numb numb-font",
            }}
            classesDesk={{
              btn: "basic-number-desk  bnd-num-desk btn-grp-numb numb-font",
            }}
          ></NumbersRult>

          <NumbersRult
            setModal={setModal}
            setBets={[bets, setBets]}
            key={"btn-numb-" + "25-36"}
            content={"25-36"}
            styles={{
              div: { display: "inline" },
            }}
            classesMob={{
              btn: "basic-number-mob  bnd-num-mob btn-grp-numb numb-font",
            }}
            classesDesk={{
              btn: "basic-number-desk  bnd-num-desk btn-grp-numb numb-font",
            }}
          ></NumbersRult>

          <NumbersRult
            setModal={setModal}
            setBets={[bets, setBets]}
            key={"btn-numb-" + "RED"}
            content={"RED"}
            styles={{
              div: { display: "inline" },
            }}
            classesMob={{
              btn: "basic-number-mob  clred-num-mob btn-red-numb numb-font",
            }}
            classesDesk={{
              btn: "basic-number-desk  clred-num-desk btn-red-numb numb-font",
            }}
          ></NumbersRult>

          <NumbersRult
            setModal={setModal}
            setBets={[bets, setBets]}
            key={"btn-numb-" + "BLACK"}
            content={"BLACK"}
            styles={{
              div: { display: "inline" },
            }}
            classesMob={{
              btn: "basic-number-mob  clblack-num-mob btn-black-numb numb-font",
            }}
            classesDesk={{
              btn: "basic-number-desk  clblack-num-desk btn-black-numb numb-font",
            }}
          ></NumbersRult>

          <NumbersRult
            setModal={setModal}
            setBets={[bets, setBets]}
            key={"btn-numb-" + "ODD"}
            content={"ODD"}
            styles={{
              div: { display: "inline" },
            }}
            classesMob={{
              btn: "basic-number-mob  btnodd-num-mob btn-oddeven-numb numb-font",
            }}
            classesDesk={{
              btn: "basic-number-desk  btnodd-num-desk btn-oddeven-numb numb-font",
            }}
          ></NumbersRult>

          <NumbersRult
            setModal={setModal}
            setBets={[bets, setBets]}
            key={"btn-numb-" + "EVEN"}
            content={"EVEN"}
            styles={{
              div: { display: "inline" },
            }}
            classesMob={{
              btn: "basic-number-mob  btneven-num-mob btn-oddeven-numb numb-font",
            }}
            classesDesk={{
              btn: "basic-number-desk  btneven-num-desk btn-oddeven-numb numb-font",
            }}
          ></NumbersRult>
        </div>
      </div>
    </div>
  );
}
