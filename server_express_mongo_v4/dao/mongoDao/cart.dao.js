import { cartModel } from "../models/Cart.js";
import productManager from "./product.dao.js";

class CartManager {
  // Agrego un carrito / retorno el carrito
  create = async (data) => {
    const cart = await cartModel.create(data);
    return cart;
  };

  // Agrego producto al carrito
  addProductToCart = async (cid, pid) => {
    const product = await productManager.getById(pid);
    if (!product) return -1;

    const cart = await cartModel.findById(cid);
    if (!cart) return -1;

    const productInCart = await cartModel.findOneAndUpdate(
      { _id: cid, "products.product": pid },
      { $inc: { "products.$.quantity": 1 } }
    );

    if (!productInCart) {
      await cartModel.updateOne(
        { _id: cid },
        { $push: { products: { product: pid, quantity: 1 } } }
      );
    }
    return 0;
  };

  // Busco los datos de un carrito
  getById = async (id) => {
    const cart = await cartModel.findById(id);
    return cart;
  };

  //Elimino producto del carrito
  deleteProductFromCart = async (cid, pid) => {
    const product = await productManager.getById(pid);
    if (!product) return -1;

    const cart = await cartModel.findOneAndUpdate(
      { _id: cid, "products.product": pid },
      { $inc: { "products.$.quantity": -1 } },
      { new: true }
    );

    if (!cart) return -1;

    return 0;
  };

  // Vacio el Carrito
  emptyCart = async (cid) => {

    const cart = await cartModel.findByIdAndUpdate(cid, {
      $set: { products: [] },
    });

    const cartUpdate = await cartModel.findById(cid);
    return cartUpdate;

  };

  // Cargo cantidad especifica de productos
  setQuantity = async (cid, pid, cantidad) => {

    const product = await productManager.getById(pid);
    if (!product) return -1;

    // Verificar si la nueva cantidad es válida
    if (cantidad <= 0) return -1;

    // Buscar el carrito y actualizar la cantidad del producto
    const cart = await cartModel.findOneAndUpdate(
      { _id: cid, "products.product": pid },
      { $set: { "products.$.quantity": cantidad } },
      { new: true }
    );

    // Si el carrito no existe, retornar un error
    if (!cart) return -1;

    return 0;
  }
}

const cartManager = new CartManager();
export default cartManager;
