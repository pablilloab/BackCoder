import { request, response } from "express";

export const isAdmin = async (req = request, res = response, next) => {
    
    if (!req.session.user) {
        return res.status(400).json({ status: "error", msg: "Usuario no autenticado." });
    }
    
    if (req.session.user.email !== "admin@admin.com") {
        return res.status(401).json({ status: "error", msg: "No tiene permisos de adminmistrador" });
    }

    next();
}