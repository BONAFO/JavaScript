import { validateLogin } from "../../controllers/user/logIn.cont.js";

export async function midLogin(req,res){
  const validator = await  validateLogin(req.body);
  res.status(validator.status).json({msj: validator.msj});
}

