import { intDB } from "../database/numbers";

const traslateFirtsSection = (section) => {
  const traslation = [];
  for (let i = 0; i < section.length; i++) {
    section[i] = parseInt(section[i]);

    if (section[i] !== 0) {
      const numbFound = intDB.filter((numbDB) => numbDB.id === section[i]);
      traslation.push({
        kanji: numbFound[0].traslate[i].kanji,
        romanji: numbFound[0].traslate[i].romanji,
      });
    } else {
      traslation.push({
        kanji: "",
        romanji: "",
      });
    }
  }

  return traslation;
};

const traslateNSection = (sectionParam, levelParam) => {
  let level = (levelParam *= 4) + 0;
  const section = JSON.parse(JSON.stringify(sectionParam));
  const originalLevel = level + 0;
  let headFound;
  let emptyHead = false;

  if (parseInt(section[0]) === 0) {
    let breaker = 0;

    do {
      breaker++;

      if (parseInt(section[breaker]) !== 0) {
        headFound = intDB.filter(
          (numbDB) => numbDB.id === parseInt(section[breaker])
        );

        breaker = 3;
      }
      level++;
    } while (breaker < 3);

    if (headFound == undefined) {
      emptyHead = true;
    }
  } else {
    headFound = intDB.filter((numbDB) => numbDB.id === parseInt(section[0]));
  }
  if (!emptyHead) {
    let headData = headFound[0].traslate[level];

    section[level - originalLevel] = 0;


    const bodyData = traslateFirtsSection(section);
    let traslation = [];
    traslation.push(headData);
    traslation = traslation.concat(bodyData);


    traslation = traslation.filter((data) => data !== undefined && data.kanji !== "");
    return traslation;
  } else {
    return [
      {
        kanji: "",
        romanji: "",
      },
    ];
  }
};

export const traslateNumber = (number) => {
  let traslation = {
    kanji: "",
    romanji: "",
  };

  number = number.toString().split("").reverse();

  let sections = [];

  const breaker =
    number.length % 4 === 0
      ? Math.floor(number.length / 4)
      : Math.floor(number.length / 4 + 1);

  for (let i = 0; i < breaker; i++) {
    if (i === 0) {
      const aux = number.slice(i * 4, (i + 1) * 4);
      sections.push(aux);
    } else {
      const aux = number.slice(i * 4, (i + 1) * 4);
      sections.push(aux);
    }
  }

  let finalSeccion = [];

  finalSeccion = finalSeccion.concat(traslateFirtsSection(sections[0]));
  for (let i = 1; i < sections.length; i++) {
    finalSeccion = finalSeccion.concat(traslateNSection(sections[i], i));
  }
  finalSeccion.reverse();

  for (let i = 0; i < finalSeccion.length; i++) {
    traslation.kanji += finalSeccion[i].kanji;
    traslation.romanji += " " + finalSeccion[i].romanji;
  }

  return traslation;
};
