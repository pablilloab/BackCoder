import { Router } from "express";
import productsControllers from "../controllers/products.controllers.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isLogin } from "../middlewares/isLogin.middleware.js";

const router = Router();

//end point todo los productos.
router.get("/", isLogin, productsControllers.getAll);

//end point todo los productos para la view sin login.
router.get("/view", productsControllers.getAll);

//end point producto por id
router.get("/:pid", isLogin, productsControllers.getById);

//creo un producto nuevo
router.post("/", isLogin, isAdmin, productsControllers.create);

//modifico datos del producto
router.put("/:pid", isLogin, isAdmin, productsControllers.update);

//borro producto
router.delete("/:pid", isLogin, isAdmin, productsControllers.deleteOne);

export default router;
