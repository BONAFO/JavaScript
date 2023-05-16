const intGenerator = ({ min, max }) => {
  return Math.floor(Math.random() * max + min);
};

const floatGenerator = ({ min = 0, max = 999999999, decimals = 0 }) => {
  return (Math.random() * (max - min) + min).toFixed(decimals);
};

const preventRepeat = (number, numbers) => {
  if (numbers.filter((numb) => numb === number).length === 0) {
    return true;
  } else {
    return false;
  }
};

export const validateInputs = ({
  min,
  max,
  decimals,
  ammount,
  type,
  repeat,
}) => {
  const msj = {
    bool: true,
    txt: "",
    errno: 0,
    value: {
      min: isNaN(parseFloat(min)) ? 0 : parseFloat(min),
      max: isNaN(parseFloat(max)) ? 999999999 : parseFloat(max),
      decimals:
        isNaN(parseInt(decimals)) || decimals < 0 ? 0 : parseInt(decimals),
      ammount: isNaN(parseInt(ammount)) || ammount < 0 ? 1 : parseInt(ammount),
      type: type,
      repeat: repeat,
    },
  };

  if (isNaN(msj.value.min)) {
    msj.bool = false;
    msj.txt = "";
    msj.errno = 1;
  }

  if (isNaN(msj.value.max)) {
    msj.bool = false;
    msj.txt = "";
    msj.errno = 1;
  }

  if (isNaN(msj.value.decimals)) {
    msj.bool = false;
    msj.txt = "";
    msj.errno = 2;
  }

  if (isNaN(msj.value.ammount)) {
    msj.bool = false;
    msj.txt = "";
    msj.errno = 3;
  }

  return msj;
};

export const generator = ({ min, max, decimals, type, ammount, repeat }) => {
  const numbers = [];
  switch (type) {
    case "float":
      for (let i = 0; i < ammount; i++) {
        if (repeat) {
          let breaker = 0;
          do {
            const number = floatGenerator({
              min: min,
              max: max,
              decimals: decimals,
            });
            if (preventRepeat(number, numbers)) {
              numbers.push(number);
              break;
            }
            breaker++;
          } while (breaker <= 100000);
        } else {
          numbers.push(
            floatGenerator({ min: min, max: max, decimals: decimals })
          );
        }
      }

      return numbers;

    case "int":
      for (let i = 0; i < ammount; i++) {
        if (repeat) {
          let breaker = 0;
          do {
            const number = intGenerator({ min: min, max: max });

            if (preventRepeat(number, numbers)) {
              numbers.push(number);
              break;
            }
            breaker++;
          } while (breaker <= 100000);
        } else {
          numbers.push(intGenerator({ min: min, max: max }));
        }
      }

      return numbers;
  }
};
