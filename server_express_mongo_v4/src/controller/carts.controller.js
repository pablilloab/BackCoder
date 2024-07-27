import cartManager from "../../dao/mongoDao/cart.dao.js";

const createCart = async function addCart(req, res) {
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

  const getCartById = async function getCartById(req, res) {
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

  const addProductToCart = async function addProductToCart(req, res) {
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

  const deleteProduct = async function deleteProduct(req, res) {
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

  const emptyCart = async function emptyCart(req, res) {
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


  const updateQuantity = async function updateQuantity(req, res) {
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

  export default {
    createCart, getCartById, addProductToCart, deleteProduct, emptyCart, updateQuantity
  }