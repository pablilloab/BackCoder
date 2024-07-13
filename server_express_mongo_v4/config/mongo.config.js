import mongoose from 'mongoose';

const dbName = "ecommerce";
const connectionString = `mongodb+srv://admin:pabacs0214@cluster0.tqqey9a.mongodb.net/${dbName}`;

export const connectionDB = async () => {
    try {
        //configuracion de la conexion con la DB
        mongoose.connect(connectionString);
        console.log("MongoDB Conectado...");

    } catch (error) {
        console.log(error);
    }
};