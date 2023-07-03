import express from "express";

const router = express.Router();


router.post("/login", (req, res) => {
    console.log(req.headers.authorization, "eq.body");
    console.log(req.body, "eq.body");
    res.json({name : "NAOMI"})

});


router.get("/login", (req, res)=>{
res.json({name : "NAOMI"})
})

export { router as login_routes };
