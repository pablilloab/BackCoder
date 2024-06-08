import express from "express";
import indexRouter from "../routes/index.js";
import { connectionDB } from "../config/mongo.config.js" ;
import session from "express-session";
import MongoStore from "connect-mongo";

const server = express();
connectionDB();

const port = 8080;
const statusOk = console.log("Server Online en puerto " + port);

//inicio server
server.listen(port, statusOk);

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const dbName = "ecommerce";
const connectionString = `mongodb+srv://admin:pabacs0214@cluster0.tqqey9a.mongodb.net/${dbName}`;
server.use(session({
    store: MongoStore.create({
       mongoUrl: connectionString,
       ttl: 15
    }),
    secret: "TomRiddle",
    resave: true
}));

server.use("/", indexRouter);




