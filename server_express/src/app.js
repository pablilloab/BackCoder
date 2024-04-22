import express from "express";
import productManager from "../classes/ProductManager.js";
import cartsManager from "../classes/CartManager.js"
import indexRouter from "../routes/index.js";

const server = express();

const port = 8080;
const statusOk = console.log("Server Online en puerto " + port);

//inicio server
server.listen(port, statusOk);

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/", indexRouter);

//endpoint para inicializar la app
server.get("/", indexCarrito),
server.get("/", indexProducto);

//index : esta funcion inicializa los datos de producto de la app
async function indexProducto(req, res) {
  try {
    await productManager.initialize();
    return res.json({ status: 200, response: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, resopnse: error.message });
  }
}

async function indexCarrito(req, res){
  try {
    await cartsManager.initialize();
    return res.json({status:200, response:"ok"});

  } catch (error) {
    console.log(error);
    return res.json({ status: 500, resopnse: error.message });
  }
}
