import mongoose from 'mongoose';
import __dirname from "./dirname.js"
import { userModel } from "./user.model.js"

const dbName = "indexacion_ejemplo";
const connectionString = `mongodb+srv://admin:pabacs0214@cluster0.tqqey9a.mongodb.net/${dbName}`;

const environment = async () => {
    await mongoose.connect(connectionString);

    const response = await userModel.find({first_name: "Celia"}).explain("executionStats");

    console.log(response);

}

environment();