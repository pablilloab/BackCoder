import { Router } from "express";
import userManager from "../dao/mongoDao/user.dao.js";

const router = Router();

router.post("/users/register", registerUser);
router.post("/users/login", loginUser);
router.get("/users/logout", logoutUser)

async function registerUser(req, res) {
  try {
    const userData = req.body;
    const newUser = await userManager.addUser(userData);

    if (!newUser) {
      const error = new Error("El usuario no se pudo registrar");
      error.status = 404;
      throw error;
    }

    return res.status(201).json({ status: "success", paylodad: newUser });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, resopnse: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    //check si el user que intenta hacer el login es el admin
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      req.session.user = {
        email,
        role: "admin",
      };
      return res
        .status(201)
        .json({ status: "success", paylodad: req.session.user });
    }

    const user = await userManager.getByEmail(email);
    if (!user || user.password !== password) {
      const error = new Error("Error al loguearse");
      error.status = 401;
      throw error;
    }

    req.session.user = {
        email,
        role: "user"
    }
    return res.status(200).json({ status: "success", paylodad: req.session.user });

  } catch (error) {
    console.log(error);
    return res.json({ status: 500, resopnse: error.message });
  }
}

async function logoutUser(req, res){
    try {
        
        req.session.destroy()       
    
        return res.status(200).json({ status: "success", message: "Sesión cerrada" });

      } catch (error) {
        console.log(error);
        return res.json({ status: 500, resopnse: error.message });
      }  
}


export default router;
