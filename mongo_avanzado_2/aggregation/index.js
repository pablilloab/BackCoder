import mongoose from 'mongoose';
import __dirname from "./dirname.js"

const dbName = "db_aggregate";
const connectionString = `mongodb+srv://admin:pabacs0214@cluster0.tqqey9a.mongodb.net/${dbName}`;

const environment = async () => {
    await mongoose.connect(connectionString);

  

}

environment();