import axios from "axios";

// return await axios.post(url, userdata,{headers: { authorization: "TU VIEJA"}});

//LOGIN A USER
export const logIn = async (url, userdata) => {
    return await axios.post(url, userdata);
}

export const validateLogin = (userData) => {
    const msj = {
        txt: "",
        type : "err",
        bool: false
    };
    if (userData.username.length > 0 && userData.password.length > 0) {
        msj.bool = true;
    } else {
        msj.txt = "Invalid username an/or password.";
    }
    return msj;
}