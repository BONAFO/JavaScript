import { black, userdata } from "../components/Roulette";
import isMobile from "./isMobile";



const getBtns = () => {
  if (isMobile()) {
    return document.getElementsByClassName("basic-number-mob");
  } else {
    return document.getElementsByClassName("basic-number-desk");
  }
};

const selectSpecialStyle = (betID) => {
  if (!isNaN(betID)) {
    if (betID === 0) {
      return " btn-0-selected";
    } else if (black.filter((numb) => numb === betID).length !== 0) {
      return " btn-black-selected";
    } else {
      return " btn-red-selected";
    }
  } else if (betID.toString().includes("-")) {
    return " btn-grp-selected"
  } else if (typeof betID === "string") {
    switch (betID.toLocaleLowerCase()) {
      case "black":
        return " btn-black-selected";
         
      case "red":
        return " btn-red-selected";
         
      case "odd":
        return " btn-oddeven-selected";
         
      case "even":
        return " btn-oddeven-selected";
         
    }
  }
};



const searchBtn = (betID) => {
  let btns = getBtns();
  for (let i = 0; i < btns.length; i++) {
    if (
      btns[i].textContent.toString().toLowerCase() ===
      betID.toString().toLowerCase()
    ) {
      return btns[i];
    }
  }
};

const changeBtnColor = (bets) => {
  resetAllBtnsColor();
  bets.map((bet) => {
    const btn = searchBtn(bet.id);
    if (bet.money > 0) {
      const specialClass = selectSpecialStyle(bet.id);
      if (!btn.className.includes(specialClass)) {
        btn.className += specialClass;
      }
    }
  });
};

export const resetAllBtnsColor = () => {
  let btns = getBtns();
  const specialClasses = [
    " btn-0-selected",
    " btn-black-selected",
    " btn-red-selected",
    " btn-oddeven-selected",
    " btn-grp-selected"
  ];
  for (let i = 0; i < btns.length; i++) {
    specialClasses.map((classN) => {
      btns[i].className = btns[i].className.replace(classN, "");
    });
  }
};


export const validateBet = (bet, bets, id) => {
  const betIndex = getBetIndex(id, bets);

  if (betIndex !== -1) {
    bets[betIndex].money = 0;
  }

  const deb = calculateDeb(bets);

  let moneTOuse = userdata.money - deb;

  if (bet < moneTOuse) {
    moneTOuse = bet;
  }
  return moneTOuse;
};



export const setBetTxt = (bet) => {
  if (bet.betLevel < 1000) {
    return "$" + bet.betLevel;
  } else if (bet.betLevel < 1000 * 100) {
    return "$" + bet.betLevel / 1000 + "K";
  } else if (bet.betMoney < 1000 * 100 * 100) {
    return "$" + bet.betMoney / (1000 * 100) + "M";
  }
};

export const setDebTxt = (bets) => {
  const deb = calculateDeb(bets);
  if (deb < 1000) {
    return "$" + deb;
  } else if (deb < 1000 * 100) {
    return "$" + deb / 1000 + "K";
  } else if (deb < 1000 * 100 * 100) {
    return "$" + deb / (1000 * 100) + "M";
  }
};

export const calculateDeb = (bets) => {
  let finalDEB = 0;
  bets.map((bet) => (finalDEB += bet.money));
  return finalDEB;
};

export const getBetByID = (id, bets) => {
  const resp = {
    bool: false,
  };

  const found = bets.filter((bet) => bet.id.toString() === id.toString());

  if (found.length !== 0) {
    resp.bool = true;
    resp.data = found[0];
  }
  return resp;
};

export const deleteBet = (id, setBets) => {
  setBets[0] = setBets[0].filter((bet) => bet.id.toString() !== id.toString());
  setBets[1](setBets[0]);
  document.getElementById("user-money").textContent = `$${
    userdata.money
  }(-${setDebTxt(setBets[0])})`;
  changeBtnColor(setBets[0]);
};
const getBetIndex = (id, bets) => {
  const found = bets.filter((bet) => bet.id.toString() === id.toString());
  if (found.length !== 0) {
    return bets.indexOf(found[0]);
  } else {
    return -1;
  }
};

export const makeAbet = (bet, setBets) => {
  const baseBet = {
    id: bet.id,
    money: bet.money,
  };

  const betIndex = getBetIndex(bet.id, setBets[0]);

  if (betIndex !== -1) {
    setBets[0][betIndex] = baseBet;
  } else {
    setBets[0].push(baseBet);
  }

  document.getElementById("user-money").textContent = `$${
    userdata.money
  }(-${setDebTxt(setBets[0])})`;
  setBets[1](setBets[0]);
  changeBtnColor(setBets[0]);
};
