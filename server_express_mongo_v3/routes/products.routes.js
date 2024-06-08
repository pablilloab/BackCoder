import { Router } from "express";
import productManager from "../dao/mongoDao/product.dao.js";
//import Producto from "../classes/Producto.js";

const router = Router();

//traigo un producto por id
router.get("/products/:pid", getProductById);

//traigo todos los productos o el limite que indico
router.get("/products", getProducts);

//agrego un producto
router.post("/products/add", addProduct);

//actualizo un producto
router.put("/products/update/:pid", updateProduct);

//borro un producto
router.delete("/products/delete/:pid", deleteProduct);



//getProducts : me traigo todos los productos o la cantidad del limite.
async function getProducts(req, res) {
  try {
    let { limit, page, sort, category, status } = req.query;

    // Declaro objeto para el paginado
    const options = {
      limit: parseInt(limit) || 10,
      page: parseInt(page) || 1,
      sort: {
        price: sort === "asc" ? 1 : -1
      },
      lean: true
    };

    // Construyo el query de búsqueda
    let query = {};

    if (status) {
      query.status = status;
    }

    if (category) {
      query.category = category;
    }

    // Realizo la consulta
    const products = await productManager.getProductos(query, options);
    
    // Preparo las respuesta
    const response = {
      status: 'success',
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage
    };

    if (products.docs.length > 0) {
      return res.json({ status: 201, response });
    }

    const error = new Error("Sin datos para mostrar");
    error.status = 404;
    throw error;

  } catch (error) {
    console.log(error);
    return res.json({ status: 500, resopnse: error.message });
  }
}

//addProduct : agrego un producto al carrito
async function addProduct(req, res) {
  try {
    const producto = req.body;
    const created = await productManager.addProduct(producto);

    if (created) {
      return res.json({ status: 201, response: producto });
    }

    const error = new Error("No se pudo cargar el producto");
    error.status = 500;
    throw error;
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, response: error.message });
  }
}

//getProductById : retorna un produto por su id
async function getProductById(req, res) {
  try {
    const { pid } = req.params;
    const product = await productManager.getById(pid);

    if (product) {
      return res.json({ response: 200, product });
    }
    const error = new Error("Producto no encontrado");
    error.status = 404;
    throw error;

  } catch (error) {
    console.log(error);
    return res.json({ status: 500, resopnse: error.message });

  }
}

//updateProduct: actualizo un producto
async function updateProduct(req, res){
  try {
    const {pid} = req.params;
    const data = req.body;

    const updated = await productManager.update(pid, data);
    if(updated){
      return res.json({status:200, data})
    }
    
    const error = new Error("Algo salió mal");
    error.status = 404;
    throw error;
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, resopnse: error.message });
  }
}

async function deleteProduct(req, res){
  try {
    const {pid} = req.params;
    const deleted = await productManager.deleteOne(pid);

    if (deleted){
      return res.json({status:200, message:"Producto Borrado"})
    }
    const error = new Error("Algo salió mal");
    error.status = 404;
    throw error;

  } catch (error) {
    
    console.log(error);
    return res.json({ status: 500, resopnse: error.message });
  }
}




export default router;