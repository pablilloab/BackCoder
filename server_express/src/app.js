import express from "express";
import productManager from "../classes/ProductManager.js";

const server = express();

const port = 8080;
const statusOk = console.log("Server Online en puerto " + port);

//inicio server
server.listen(port, statusOk);

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//endpoint para inicializar la app
server.get("/", index);

//traigo un producto por id
server.get("/products/:pid", getProductById);

//traigo todos los productos o el limite que indico
server.get("/products", getProducts);

//agrego un producto
server.post("/add", addProduct);

//index
function index(req, res) {
  try {
    productManager.initialize();
    return res.json({ status: 200, response: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, resopnse: error.message });
  }
}

//getProducts : me traigo todos los productos o la cantidad del limite.
async function getProducts(req, res) {
  try {
    let limit = req.query.limit;
    let allProductos = await productManager.getProductos();
    //console.log(allProductos);
    if (limit > 0) {
      allProductos = allProductos.slice(0, parseInt(limit));
    }

    if (allProductos.length > 0) {
      return res.json({ status: 200, response: allProductos });
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

    if (created === 0) {
      return res.json({ status: 201, response: producto });
    }

    const error = new Error("No se pudo cargar el producto");
    error.status = 500;
    throw error;
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, resopnse: error.message });
  }
}

//getProductById : retorna un produto por su id
async function getProductById(req, res) {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);

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
