import mongoose from "mongoose";
import envsConfig from "./envs.config";


export class MongoConfig {

    connect(){
        try{
            if(!envsConfig.MONGO_URL) throw new Error("Falta la connection string de Mongo");
            //el ! al final de la sentencia indica que es un valor que nuva va a ser null, lo pienso y se lo indico a ts
            mongoose.connect(envsConfig.MONGO_URL);
            console.log("MongoDB listo y ejecutandose...")

        }catch (error){
            console.log(`Error - No se puede conectar con MongoDB: ${error}`);
        }
    }
}