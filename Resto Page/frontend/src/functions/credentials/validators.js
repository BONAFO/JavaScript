const phone_min_length = 6;

const areTheSame = (toValidate) => {
  return toValidate[0] === toValidate[1];
};

export const basicValidation = (toValidate) => {
  return toValidate !== "";
};

export const noSpaces = (toValidate) => {
  return toValidate.toString().includes(" ");
};

const phoneLength = (toValidate) => {
  return (toValidate.toString()).length >= phone_min_length;
};

const emailValidation = (toValidate) => {
  return (
    toValidate.includes("@") &&
    toValidate.includes(".") &&
    (toValidate.includes("com") ||
      toValidate.includes("net") ||
      toValidate.includes("org") ||
      toValidate.includes("gov"))
  );
};

export const specialValidations = (key, value) => {
  const validator = { bool: true, err: [] };

  switch (key) {
    case "password":
      if (!areTheSame(value)) {
        validator.bool = false;
        validator.err.push({
          field: key,
          err: "phone invalid",
        });
      }
      break;
    case "phone":

      if(value !== false){
        if (isNaN(value)) {
            validator.bool = false;
            validator.err.push({
              field: key,
              err: "nan",
            });
          }
    
          if (!phoneLength(value)) {
            validator.bool = false;
            validator.err.push({
              field: key,
              err: "phone invalid",
            });
          }
      }

      break;
    case "email":
      if (!emailValidation(value)) {
        validator.bool = false;
        validator.err.push({
          field: key,
          err: "email invalid",
        });
      }
      break;
  }

  return validator;
};
