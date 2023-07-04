import { basicValidation, noSpaces, specialValidations } from "./validators";

const error_table = [{ id: 0, txt: "-Field [$$NAME_FIELD$$] can't be empty." }];

const msjBuilder = () => {};

export function validateNewUser(userData) {
  const msj = {
    txt: "",
    type: "",
    bool: true,
    err: [],
  };

  Object.keys(userData).map((key) => {
    if (!basicValidation(userData[key])) {
      if (key !== "name" && key !== "address" && key !== "phone") {
        msj.bool = false;
        msj.err.push({
          field: key,
          err: "null",
          id: 0,
        });
      }
    }

    if (key !== "name" && key !== "address" && key) {
      if (noSpaces(userData[key])) {
        msj.bool = false;
        msj.err.push({
          field: key,
          err: "space",
        });
      }
    }

    const special =
      key === "password"
        ? specialValidations(key, [userData[key], userData["repassword"]])
        : specialValidations(key, userData[key]);

    if (!special.bool) {
      msj.bool = false;
      msj.err.push({
        field: key,
        err: special.err,
      });
    }
  });

  console.log(msj);
}
