import mongoose from 'mongoose';
import { userModel } from './models/user.model.js';

const dbName = "indexacion_ejemplo";
const connectionString = `mongodb+srv://admin:pabacs0214@cluster0.tqqey9a.mongodb.net/${dbName}`;

const environment = async () => {
    await mongoose.connect(connectionString);

    const users = await userModel.paginate({gender:"Female"},{limit:20, page:30});

    console.log(users);

}

environment();