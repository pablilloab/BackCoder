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

    if(!product) return -1;
  
    await cartModel.findByIdAndUpdate(cid, { $push: {product: product} });
  
    const cart = await cartModel.findById(cid);
    if(!cart) return -1;
    
    return 0;    
  };

  // Busco los datos de un carrito
  getById = async (id) => {
    const cart = await cartModel.findById(id);
    return cart;
  };

}

const cartManager = new CartManager();
export default cartManager;