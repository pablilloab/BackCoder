import { Router } from "express";
import userRepo from "../persistences/mongo/repositories/user.repository.js"
import cartsServices from "../services/carts.services.js";

const router = Router();

//alta de usuario
router.post("/register", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userRepo.create(userData);
    if (!newUser) return res.status(400).json({ status: "Error", msg: "No se pudo crear el usuario" });

    // Crear el carrito asociado al nuevo usuario
    const cart = await cartsServices.createCart(); // Servicio para crear el carrito
    if (!cart) return res.status(500).json({ status: "Error", msg: "No se pudo crear el carrito" });

    // Asignar el carrito al usuario y guardar los cambios
    newUser.cart = cart._id;
    await newUser.save();

    res.status(201).json({ status: "success", payload: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

//login de ususario
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar que el usuario sea administrador
    if (email === "admin@admin.com" && password === "12345") {
      req.session.user = {
        email: "admin@admin.com",
        role: "admin",
        cart: null
      };
      return res.status(200).json({ status: "success", payload: req.session.user });
    }

    // En caso de que no sea administrador
    const user = await userRepo.getByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ status: "Error", msg: "Email o password no válidos" });
    }

    req.session.user = {
      email:user.email,
      role: "user",
      cart: user.cart._id
    };

    res.status(200).json({ status: "success", payload: req.session.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});


//logout usuario
router.get("/logout", async (req, res) => {
  try {
    req.session.destroy();

    res.status(200).json({ status: "success", msg: "Sesión cerrada con éxito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

export default router;

