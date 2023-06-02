export const intDB = [];

// const dozenTraslations = ["", "十", "百", "千"];

const dozenTraslations = (id, dozen) => {
  const dozenTraslationsArr = ["", "十", "百", "千"];
  const traslation = {
    kanji: dozenTraslationsArr[dozen],
  };
  let romanji = [];

  switch (parseInt(id.toString()[0])) {
    case 1:
      romanji = ["", "juu", "hyaku", "sen"];
      break;

    case 2:
      romanji = ["", "ni juu", "ni hyaku", "ni sen"];
      break;

    case 3:
      romanji = ["", "san juu", "san byaku", "san zen"];
      break;

    case 4:
      romanji = ["", "yon juu", "yon hyaku", "yon sen"];
      break;

    case 5:
      romanji = ["", "go juu", "go hyaku", "go sen"];
      break;

    case 6:
      romanji = ["", "roku juu", "rop pyaku", "roku sen"];
      break;

    case 7:
      romanji = ["", "nana juu", "nana hyaku", "nana sen"];
      break;

    case 8:
      romanji = ["", "hachi juu", "hap pyaku", "ha sen"];
      break;

    case 9:
      romanji = ["", "kyuu juu", "kyuu hyaku", "kyuu sen"];
      break;
  }
  traslation.romanji = romanji[dozen];
  return traslation;
};
const traslateDozens = (id) => {
  id = id.toString();
  let traslation = { kanji: "", romanji: "" };
  const traslationDozen = dozenTraslations(id, (id.length - 1) % 4);
  traslation.kanji += traslationDozen.kanji;
  traslation.romanji += " " + traslationDozen.romanji;

  switch (Math.floor((id.length - 1) / 4)) {
    case 1:
      traslation.kanji += "万";
      traslation.romanji += " " + "man";
      traslation.excepsion = true;
      break;
    case 2:
      traslation.kanji += "億";
      traslation.romanji += " " + "oku";
      traslation.excepsion = true;
      break;
  }
  return traslation;
};

const traslateBase = (id) => {
  switch (parseInt(id)) {
    case 1:
      return {
        kanji: "一",
        romanji: "ichi",
      };
    case 2:
      return {
        kanji: "二",
        romanji: "ni",
      };
    case 3:
      return {
        kanji: "三",
        romanji: "san",
      };
    case 4:
      return {
        kanji: "四",
        romanji: "yon",
      };
    case 5:
      return {
        kanji: "五",
        romanji: "go",
      };
    case 6:
      return {
        kanji: "六",
        romanji: "roku",
      };
    case 7:
      return {
        kanji: "七",
        romanji: "nana",
      };
    case 8:
      return {
        kanji: "八",
        romanji: "hachi",
      };
    case 9:
      return {
        kanji: "九",
        romanji: "kyuu",
      };
  }
};

const traslateDB = (number) => {
  let dozens = number.toString().length;
  let base = number.toString()[0];
  base = traslateBase(base);
  dozens = traslateDozens(number);

  if (number < 9) {
    return base;
  } else if (dozens.kanji.length === 1) {
    if (number.toString()[0] == "1") {
      return dozens;
    } else if (dozens.excepsion) {
      return {
        kanji: base.kanji + dozens.kanji,
        romanji: base.romanji.trim() + " " + dozens.romanji.trim(),
      };
    } else {
      return {
        kanji: base.kanji + dozens.kanji,
        romanji: dozens.romanji,
      };
    }
  } else {
    if (number.toString()[0] == "1") {
      return dozens;
    } else {
      return {
        kanji: base.kanji + dozens.kanji,
        romanji: dozens.romanji,
      };
    }
  }
};

const createTraslation = (id) => {
  const traslate = [];
  for (let i = 0; i <= 8; i++) {
    let traslation = traslateDB(id * 10 ** i);
    traslation.romanji = traslation.romanji.trim();
    delete traslation.excepsion;
    traslate.push(traslation);
  }
  return traslate;
};
const createINTDB = () => {
  for (let i = 1; i <= 9; i++) {
    intDB.push({
      id: i,
      traslate: createTraslation(i),
    });
  }
};

createINTDB();

// console.log(traslateNumber(999999999999));
// ;
