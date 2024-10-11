import { request, response } from "express";

export const isUserCart = async (req = request, res = response, next) => {
    const { cid } = req.params;

    // Verifica si el usuario está en la sesión y tiene un carrito
    if (!req.session.user || !req.session.user.cart) {
        return res.status(400).json({ status: "error", msg: "Usuario no autenticado o sin carrito." });
    }

    // Compara el carrito del usuario con el cid de los parámetros
    if (req.session.user.cart.toString() !== cid) {
        return res.status(401).json({ status: "error", msg: "El id del carrito no corresponde al usuario" });
    }

    next();
}
