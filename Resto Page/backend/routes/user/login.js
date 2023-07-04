import express from "express";
import { midLogin } from "../../middleware/user/logIn.midd.js";



const router = express.Router();






router.post("/login", (req, res) => {
    midLogin(req, res);
});


// router.get("/login", (req, res) => {
//     res.json({ name: "NAOMI" })
// })

export { router as login_routes };
