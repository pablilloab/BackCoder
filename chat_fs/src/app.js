import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.routes.js";
import fs from "fs";
import path from "path";

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

// Configuración de socket
const socketServer = new Server(httpServer);

// Leer los mensajes almacenados en el archivo JSON al iniciar el servidor
let messages = [];
if (fs.existsSync(messagesFilePath)) {
  const messagesData = fs.readFileSync(messagesFilePath, "utf-8");
  messages = JSON.parse(messagesData);
}

// Función para guardar los mensajes en el archivo JSON
function saveMessages() {
  const messagesData = JSON.stringify(messages);
  fs.writeFileSync(messagesFilePath, messagesData);
}

socketServer.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");

  socket.on("message", (data) => {
    messages.push(data);
    saveMessages(); // Guardar los mensajes en el archivo JSON
    socketServer.emit("messageLog", messages);
  });

  socket.on("newUser", (data) => {
    socket.broadcast.emit("newUser", data);
  });
});
