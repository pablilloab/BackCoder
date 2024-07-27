import productManager from "../../dao/mongoDao/product.dao.js";

const getProductById = async function getProductById(req, res) {
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

const getProducts = async function getProducts(req, res) {
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
  
const addProduct = async function addProduct(req, res) {
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

const updateProduct = async function updateProduct(req, res){
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

const deleteProduct = async function deleteProduct(req, res){
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
  
export default {
    getProductById, getProducts, addProduct, updateProduct, deleteProduct
}