import fs from "fs";
import crypto from "crypto";
import Cart from "../classes/Cart.js";
import productManager from "./ProductManager.js";

const path = "./fs/carritos.json";

class CartManager {
  constructor() {
    this.carts = [];
    this.initialize();
  }

  //Metodo que carga los datos del archivo o inicia uno vacio
  initialize = async () => {
    try {
      console.log("Inicio archivo");
      const data = await fs.promises.readFile(path, "utf8");
      this.carts = JSON.parse(data);
    } catch (error) {
      this.carts = [];
    }
  };

  //Metodo que guarda los datos que se trabajron al archivo.
  saveToFile = async () => {
    if (this.carts.length === 0) {
      await fs.promises.unlink(path);
    } else {
      await fs.promises.writeFile(path, JSON.stringify(this.carts));
      console.log("Maestro de carritos actualizado");
    }
  };

  //agrego un carrito / retorno el id
  addCart = async () => {
    const cart = new Cart();
    cart.id = crypto.randomBytes(12).toString("hex");

    this.carts.push(cart);
    console.log("Carrito creado correctamente");

    this.saveToFile();
    return cart.id;
  };

  
  //agrego producto al carrito
  addProductoToCart = async (cartId, productId) => {
    const indexCarrito = this.carts.findIndex(c => c.id === cartId);
    console.log("indexCarrito " + indexCarrito);

    //reviso si el producto a agregar existe en mis productos
    const product = await productManager.getProductById(productId);
    console.log("producto " + JSON.stringify(product))
    //si el producto existe
    if(product !== null && indexCarrito !== -1) {
      const productoEncarrito = this.carts[indexCarrito].products.findIndex(p => p.id === productId);
      if (productoEncarrito != -1){
        this.carts[indexCarrito].products[productoEncarrito].quantity ++;
      }else{
        this.carts[indexCarrito].products.push({id:productId, quantity:1});
      }
      this.saveToFile();
      return 0;
    }
    return -1
  }

  //listo los productos de un carrito
  getCartsProducts = async (cartId) => {
    const cartIndex = this.carts.findIndex(c => c.id === cartId);
    console.log("cartIndex " + cartIndex )
    if(cartIndex != -1){
      return JSON.stringify(this.carts[cartIndex].products);
    }
    return -1;
  }

}

const cartManager = new CartManager();
export default cartManager;