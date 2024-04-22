import { Router } from "express";
import cartManager from "../classes/CartManager.js";
import productManager from "../classes/ProductManager.js";

const router = Router();

//get carrito por id
router.get("/carts/:cid", getCartById);

//agrego un carrito
router.post("/carts/add", addCart);

//agrego productos al carrito
router.post("/carts/:cid/product/:pid", addProductToCart);

async function getCartById(req, res) {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartsProducts(cid);

    if (cart) {
      return res.json(JSON.parse(cart));
    }

    const error = new Error("El carrito no existe");
    error.status = 404;
    throw error;
  } catch (error) {
    console.log(error);
    return res.json({ status: error.status, response: error.message });
  }
}

async function addCart(req, res) {
  try {
    const indexCart = await cartManager.addCart();
    if (indexCart) {
      return res.json({ cartId: indexCart, response: "El carrito se creo" });
    }

    const error = new Error("El carrito no se pudo crear");
    error.status = 404;
    throw error;
  } catch (error) {
    console.log(error);
    return res.json({ status: error.status, response: error.message });
  }
}

async function addProductToCart(req, res) {
  try {
    const { cid, pid } = req.params;
    const response = await cartManager.addProductoToCart(cid, pid);
    if (response === 0) {
      return res.json({
        status: 200,
        message: productManager.getProductById(pid),
      });
    }
    const error = new Error("No se pudo agregar el producto");
    error.status = 404;
    throw error;
  } catch (error) {
    console.log(error);
    return res.json({ status: error.status, response: error.message });
  }
}

export default router;
