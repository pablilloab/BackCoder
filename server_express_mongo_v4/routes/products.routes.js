import { Router } from "express";
import productManager from "../dao/mongoDao/product.dao.js";
import productsController from "../src/controller/products.controller.js";
//import Producto from "../classes/Producto.js";

const router = Router();

//traigo un producto por id
router.get("/products/:pid", productsController.getProductById);

//traigo todos los productos o el limite que indico
router.get("/products", productsController.getProducts);

//agrego un producto
router.post("/products/add", productsController.addProduct);

//actualizo un producto
router.put("/products/update/:pid", productsController.updateProduct);

//borro un producto
router.delete("/products/delete/:pid", productsController.deleteProduct);

export default router;