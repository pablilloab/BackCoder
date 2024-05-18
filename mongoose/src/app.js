import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import viewsRouter from "./routes/student.routes.js";
import path from "path";
import { connectionDB } from "./config/mongoDB.config.js";

//conecxion para MONGO
connectionDB();

const PORT = 8080;
const app = express();
const messagesFilePath = path.join(__dirname, "messages.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configuración de handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

