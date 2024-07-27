import { Router } from "express";
import cartManager from "../dao/mongoDao/cart.dao.js";
import productManager from "../dao/mongoDao/product.dao.js";
import cartController from "../src/controller/carts.controller.js"

const router = Router();

//get carrito por id
router.get("/carts/:cid", cartController.getCartById);

//agrego un carrito
router.post("/carts/add", cartController.createCart);

//agrego productos al carrito
router.post("/carts/:cid/product/:pid", cartController.addProductToCart);

//borro producto del carrito
router.delete("/carts/:cid/product/:pid", cartController.deleteProduct);

//borro todos los productos del carrito
router.delete("/carts/:cid", cartController.emptyCart);

//actualizo cantidad de un producto
router.put("/carts/:cid/product/:pid", cartController.updateQuantity);

export default router;
