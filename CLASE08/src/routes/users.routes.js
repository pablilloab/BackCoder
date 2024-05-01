import { Router } from "express";

const router = Router();

router.use("/api/users", (req, res, next) => {
    console.log("middleware de users en ROUTER");

    next();
})

const users = [];
router.get("/api/users", (req, res)=>{
    res.status(200).json(users);
   
})


router.post("/api/users", (req, res)=>{
    const user = req.body;
    users.push(user);

    res.status(201).json({message : "Usuario creado"})
})

export default router;