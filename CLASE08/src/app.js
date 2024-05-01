import express from "express";
import indexRouter from "./routes/index.js";
const server = express();

const port = 8080;
const statusOk = console.log("Server Online en puerto " + port);

//Middleware: al inicio del servicor
//definicion: operaciones que se ejecutan de manera intermedia entre la peticion y el servicio de nuestro servidor
server.use(express.json()); //este middleware permite leer y responder en json
server.use(express.urlencoded({extended: true})); //este middlware permite leer archivos por medio de postman
server.use(express.static("public"));

server.use("/", indexRouter);


//inicio server
server.listen(port, statusOk);

