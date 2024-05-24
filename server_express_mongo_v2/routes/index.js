import { Router } from "express";
import productsRouter from "./products.routes.js" 
import cartsRouter from "./carts.routes.js";

const router = Router();

router.use("/", productsRouter); //le digo al server que use la ruta que importe
router.use("/", cartsRouter);

export default router;