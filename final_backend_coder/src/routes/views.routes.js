import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/products", async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/api/products/view');
        const products = response.data.products;

        // Renderizar la vista con los datos de los productos
        res.render('products', { products });
        
    } catch (error) {
        next(error);
    }
})

export default router;