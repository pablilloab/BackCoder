import { Router } from "express";
import userManager from "../dao/mongoDao/user.dao.js";
import { createHash, isValidPassword } from "../src/utils/hashPassword.js";
import passport from "passport";
import {createToken} from "../src/utils/jwt.js";

const router = Router();

router.post("/users/register", (req, res, next) => {
  passport.authenticate("register", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ status: "error", msg: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(201).json({ status: "success", msg: "Usuario Creado" });
    });
  })(req, res, next);
});

router.post("/users/login", (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ status: "error", msg: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ status: "success", payload: req.user });
    });
  })(req, res, next);
});

router.get(
  "/users/login",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    session: false,
  })
);

router.get(
  "/users/login/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/"); // Redirigir después de la autenticación exitosa
  }
);

router.get("/users/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ status: "error", msg: "Error al cerrar sesión" });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ status: "error", msg: "Error al destruir la sesión" });
      }
      res.status(200).json({ status: "success", msg: "Sesión cerrada" });
    });
  });
});

router.post("/jwt"), async(req, res)=>{
  try {
    const {email, password} = req.body

    const user = await userManager.getByEmail(email)
    if(!user || user.password !== passport) return res.status(401).json({status: "error", msg: "usuario o contraseña no validos"});

    const token = createToken(user);


    return res.status(200).json({status:"succes", payload: token})
  } catch (error) {
    
  }
}
export default router;
