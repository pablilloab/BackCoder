import express from "express";
import indexRouter from "../routes/index.js";
import { connectionDB } from "../config/mongo.config.js" ;

const server = express();
connectionDB();

const port = 8080;
const statusOk = console.log("Server Online en puerto " + port);

//inicio server
server.listen(port, statusOk);

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/", indexRouter);




