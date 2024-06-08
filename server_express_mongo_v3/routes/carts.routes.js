import { Router } from "express";
import cartManager from "../dao/mongoDao/cart.dao.js";
import productManager from "../dao/mongoDao/product.dao.js";

const router = Router();

//get carrito por id
router.get("/carts/:cid", getCartById);

//agrego un carrito
router.post("/carts/add", addCart);

//agrego productos al carrito
router.post("/carts/:cid/product/:pid", addProductToCart);

//borro producto del carrito
router.delete("/carts/:cid/product/:pid", deleteProduct);

//borro todos los productos del carrito
router.delete("/carts/:cid", emptyCart);

//actualizo cantidad de un producto
router.put("/carts/:cid/product/:pid", updateQuantity);

async function getCartById(req, res) {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getById(cid);

    if (cart) {
      return res.json(cart);
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
    const cart = await cartManager.create();
    if (cart) {
      return res.json({ cartId: cart._id, response: "El carrito se creo" });
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
    const response = await cartManager.addProductToCart(cid, pid);
    if (response === 0) {
      return res.json({
        status: 200,
        message: await productManager.getById(pid),
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

async function deleteProduct(req, res) {
  try {
    const { cid, pid } = req.params;

    const response = await cartManager.deleteProductFromCart(cid, pid);

    if (response === 0)
      return res.json({
        status: 200,
        message: "Producto elminado del carrito",
      });

    const error = new Error("No se pudo eliminar el producto");
    error.status = 404;
    throw error;
  } catch (error) {
    console.log(error);
    return res.json({ status: error.status, response: error.message });
  }
}

async function emptyCart(req, res) {
  try {
    const { cid } = req.params;
    const cart = await cartManager.emptyCart(cid);

    if (cart) {
      return res.json({ status: 200, payload: cart });
    }

    const error = new Error("No se pudo eliminar los productos del carrito");
    error.status = 404;
    throw error;
  } catch (error) {
    console.log(error);
    return res.json({ status: error.status, response: error.message });
  }
}

async function updateQuantity(req, res) {
  try {
    const { cid, pid } = req.params;
    const { cantidad } = req.body;

    const response = await cartManager.setQuantity(cid, pid, cantidad);

    if (response === 0) {
      return res.json({ status: 200, message: "Cantidad actualizada" });
    }

    const error = new Error("No se pudo actualizar la cantidad");
    error.status = 404;
    throw error;

  } catch (error) {
    console.log(error);
    return res.json({ status: error.status, response: error.message });
  }
}


export default router;
