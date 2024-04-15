import fs from "fs";
import crypto from "crypto";

const path = "./fs/productos.json"

class ProductManager {
    
    constructor() {
        this.products = [];  
        this.initialize();    
    }

    //Metodo que carga los datos del archivo o inicia uno vacio
    initialize = async () => {
        try {
            console.log("Inicio archivo");
            const data = await fs.promises.readFile(path, 'utf8');
            this.products = JSON.parse(data);
            console.log(this.products);

        } catch (error) {
           
            this.products = [];
            ProductManager.id = 0;
        }
    }

    //Metodo que guarda los datos que se trabajron al archivo.
    saveToFile = async () => {

        if (this.products.length === 0) {

            await fs.promises.unlink(path);

        } else {

            await fs.promises.writeFile(path, JSON.stringify(this.products));
            console.log("Maestro de productos actualizado");
        }
    }

    //funcnion que agrega un producto
    addProduct = async (product) => {
        // validar que no se repita el campo code
        if (this.products.some(p => p.code === product.code)) {
            console.log("El código se repite");
            return 1;
        } 

        if (Object.values(product).includes(undefined)){
            console.log("Todos los campos deben estar informados");
            return 1 ;
        }
        
        product.id = crypto.randomBytes(12).toString("hex");
        this.products.push(product);
        console.log("Producto agregado correctamente");   
        
        this.saveToFile();
        return 0;
    }

    // devuelve todos los productos
    getProductos = async () => {
        return this.products;
    }

    
    getProductById = async (id) => {
        const product = this.products.find(p => p.id === id);
        return product;
    }

    //actualizo propiedad de un producto
    updateProduct = async (id, data) =>{
        const index = this.products.findIndex(product => product.id === id);
        this.products[index]={
            ...this.products[index],
            ...data
        };
    }

    deleteProduct = async (id) =>{
        const index = this.products.findIndex(product => product.id === id);
        this.products.splice(index,1);

        console.log("Producto elminado correctamente");        
    }
}

const productManager = new ProductManager();
export default productManager;