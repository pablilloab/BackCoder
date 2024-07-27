import { userModel } from "../models/User.js";

class UserManager {
  // Agrego un producto
  addUser = async (data) => {
    const user = await userModel.create(data);
    return user;
  };

  // Devuelve todos los productos
  getUsers = async () => {
    const user = await userModel.find();
    return user;
  };

  // Devuelve producto por ID
  getById = async (id) => {
    const user = await userModel.findById(id);
    return user;
  };

  // Devuelve user por email
  getByEmail = async (email) => {
    const user = await userModel.findOne({ email });
    return user;
  };

  //Actualizo propiedad de un producto
  update = async (id, data) => {
    await userModel.findByIdAndUpdate(id, data);
    const user = await userModel.findById(id);
    return user;
  };

  deleteOne = async (id) => {
    const user = await userModel.deleteOne({ _id: id });
    if (user.deletedCount === 0) return false;
    return true;
  };
}

const userManager = new UserManager();
export default userManager;
