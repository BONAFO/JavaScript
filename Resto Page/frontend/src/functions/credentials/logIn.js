import axios from "axios";

//LOGIN A USER
export const logIn = async (url, userdata) => {
    return await axios.post(url,userdata);
}