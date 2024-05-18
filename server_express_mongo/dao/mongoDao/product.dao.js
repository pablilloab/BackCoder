import { productModel } from "../models/Producto.js";

class ProductManager {  
    
    // Agrego un producto
    addProduct = async (data) => {
        const product = await productModel.create(data);
        return product;        
    }

    // Devuelve todos los productos
    getProductos = async () => {
        const products = await productModel.find();
        return products;
    };

    
    // Devuelve producto por ID
    getById = async (id) => {
        const product = await productModel.findById(id);
        return product;
    };

    //Actualizo propiedad de un producto
    update = async (id, data) => {
        await productModel.findByIdAndUpdate(id, data);
        const product = await productModel.findById(id);
        return product;
    }

    deleteOne = async (id) => {
        const product = await productModel.deleteOne({_id: id});
        if(product.deletedCount === 0) return false;
        return true;
    }
}

const productManager = new ProductManager();
export default productManager;