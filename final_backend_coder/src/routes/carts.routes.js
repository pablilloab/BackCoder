import { Router } from "express";

//import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import { checkProductAndCart } from "../middlewares/checkProductAndCart.middleware.js";
import cartsControllers from "../controllers/carts.controllers.js";
import { isUserCart } from "../middlewares/isUserCart.js";
import { isLogin } from "../middlewares/isLogin.middleware.js";
const router = Router();

//creo carrito **
router.post("/create",isLogin, cartsControllers.createCart);

//obtener datos del carrito por id **
router.get("/:cid", isLogin, cartsControllers.getCartById);

//agrega producto al carrito **
router.post("/:cid/product/:pid", isLogin, checkProductAndCart, isUserCart, cartsControllers.addProductToCart);


//borra producto del carrito **
router.delete("/:cid/product/:pid",  isLogin, checkProductAndCart, isUserCart, cartsControllers.deleteProductInCart);


//compra el carrito **
router.get("/:cid/purchase", isLogin, isUserCart, cartsControllers.purchaseCart);


//====================================================================================================
// los siguientes endpoints los comentamos para agregarlos en la segunda entrega del TP
//====================================================================================================

//incrementa producto del carrito
//router.put("/:cid/product/:pid", checkProductAndCart,cartsControllers.updateQuantityProductInCart);


//borra todo el carito
//router.delete("/:cid",  cartsControllers.deleteAllProductsInCart);


export default router;
