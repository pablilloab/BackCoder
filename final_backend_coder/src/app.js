import express from "express";
import router from "./routes/index.js";
import { connectMongoDB } from "./config/mongoDb.config.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import envs from "./config/env.config.js";
import { errorHandle } from "./errors/errorHandle.js";
import { logger } from "./utils/logger.js";
import handlebars from "express-handlebars";
import __dirname from "../dirname.js";
 
connectMongoDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: envs.MONGO_URL,
      ttl: 15 * 60,
    }),
    secret: envs.CODE_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/api", router);

app.use(errorHandle);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "\\src\\views");
app.set("view engine", "handlebars");

app.listen(envs.PORT, () => {
  logger.log("info", `Escuchando el servidor en el puerto ${envs.PORT}`);
});
