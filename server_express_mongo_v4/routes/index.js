import { Router } from "express";
import productsRouter from "./products.routes.js" 
import cartsRouter from "./carts.routes.js";
import sessionRouter from "./session.routes.js"
import { isLogin } from "../middleware/isLogin.middleware.js";

const router = Router();

router.use("/", productsRouter); //le digo al server que use la ruta que importe
router.use("/", cartsRouter);
router.use("/", sessionRouter)

export default router;