import { userModel as User } from "../../db/conexion.js"
import colors from "colors";

const getUsers = async (params) => {
    return await User.find(params);

}


export async function validateLogin(userData) {
    const msj = {
        msj: "FAIL TO CRAFT",
        bool: false,
        status : 666,

    };
    
    if(userData !== null && userData !== undefined && typeof userData === "object"){
        const users = await getUsers({username: userData.username});
        if(users.length > 0){

        }else{
            msj.msj = "The credentials don't match a registered user.";
            msj.status= 403;
        }
    }else{
        msj.msj = "Sorry. We have problems local problems...";
        msj.status= 500;
        console.log(colors.red("Error in >>logIn/validateLogin<<, \n userData must be an object!!!"));
    }
    return msj;
    // const users = await getUsers();
    // console.log(users);
}