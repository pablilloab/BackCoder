import { Router } from "express";
import petsRouter from "./pets.routes.js" //me traigo la ruta
import usersRouter from "./users.routes.js" //me traigo la ruta

const router = Router();

router.use("/", petsRouter); //le digo al server que use la ruta que importe
router.use("/", usersRouter); //le digo al server que use la ruta que importe


export default router;