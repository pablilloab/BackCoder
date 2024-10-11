import { Router } from "express";
import cartsRouters from "./carts.routes.js";
import productsRouters from "./products.routes.js";
import sessionRouters from "./session.routes.js";
import viewRoutes from "./views.routes.js";

const router = Router();

router.use("/products", productsRouters);
router.use("/carts", cartsRouters);
router.use("/session", sessionRouters);
router.use("/views", viewRoutes);

export default router;
