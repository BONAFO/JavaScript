const intGenerator = ({ min, max }) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const floatGenerator = ({ min = 0, max = 999999999, decimals = 0 }) => {
  return (Math.random() * (max - min) + min).toFixed(decimals);
};

export const validateInputs = ({ min, max, decimals, type }) => {
  const msj = {
    bool: true,
    txt: "",
    errno: 0,
    value: {
      min: isNaN(parseFloat(min)) ? 0 : parseFloat(min),
      max: isNaN(parseFloat(max)) ? 999999999999 : parseFloat(max),
      decimals:
        isNaN(parseInt(decimals)) || decimals < 0 ? 0 : parseInt(decimals),
      type: type,
    },
  };
  
  if(parseFloat(msj.max) > 999999999999){
    msj.max = 999999999999;
  }

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

  if (msj.value.max < msj.value.min) {
    const values = {
      min: msj.value.min,
      max: msj.value.max,
    };

    msj.value.max = values.min;
    msj.value.min = values.max;
  }

  if (isNaN(msj.value.decimals)) {
    msj.bool = false;
    msj.txt = "";
    msj.errno = 2;
  }

  return msj;
};

export const generator = ({ min, max, decimals, type }) => {
  const numbers = [];
  switch (type) {
    case "float":
      numbers.push(
        floatGenerator({ min: min, max: max + 1, decimals: decimals })
      );

      return numbers;

    case "int":
      numbers.push(intGenerator({ min: min, max: max + 1 }));
      return numbers;
  }
};
