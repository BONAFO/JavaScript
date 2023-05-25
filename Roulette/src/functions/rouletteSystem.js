import { black, export_bets, slot, userdata } from "../components/Roulette";
import { calculateDeb } from "./betSystem";

const random = (min, max) => {
  return Math.floor(Math.random() * max + min);
};

export const autoSave = (save, slot) => {
  localStorage.setItem(`roulette-save-slt-${slot}`, JSON.stringify(save));
};

const paySystem = (bet, winner) => {
  if (!isNaN(bet.id) && !bet.id.toString().includes("-")) {
    if (parseInt(bet.id) === winner) {
      return bet.money * 8;
    }
  } else if (bet.id.toString().includes("-")) {
    const limmits = bet.id.toString().split("-");
    if (winner >= limmits[0] && winner <= limmits[1]) {
      return bet.money * 4;
    }
  } else if (typeof bet.id === "string") {
    if (bet.id.toLowerCase() === "black") {
      if (black.filter((numb) => numb === winner).length !== 0) {
        return bet.money * 2;
      }
    } else if (bet.id.toLowerCase() === "red") {
      if (black.filter((numb) => numb === winner).length === 0) {
        return bet.money * 2;
      }
    } else if (bet.id.toLowerCase() === "odd") {
      if (winner % 2 !== 0) {
        return bet.money * 2;
      }
    } else if (bet.id.toLowerCase() === "even") {
      if (winner % 2 === 0) {
        return bet.money * 2;
      }
    }
  }

  return 0;
};

const validateWinnerBets = (winner) => {
  let profits = 0;
  export_bets.map((bet) => (profits += paySystem(bet, winner)));
  return profits;
};

export const spinRoulette = () => {
  const deb = calculateDeb(export_bets);
  if (deb > 0) {
    const winner = random(0, 36);
    document.getElementById("winner-tag").textContent = winner;
    const profits = validateWinnerBets(winner);
    userdata.money -= deb;
    userdata.money += profits;
    autoSave(userdata, slot);
  }
};
