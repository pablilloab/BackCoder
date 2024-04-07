const fs = require('fs');
const path = './productos.json'

class ProductManager {
    static id = 0; //crear id autoincrementable
    
    constructor() {
        this.products = [];  
             
    }

    //Metodo que carga los datos del archivo o inicia uno vacio
    initialize = async () => {
        try {
            console.log("Inicio archivo");
            const data = await fs.promises.readFile(path, 'utf8');
            this.products = JSON.parse(data);

            // Obtener el último id para continuar desde ese punto
            const lastProduct = this.products[this.products.length - 1];
            ProductManager.id = lastProduct ? lastProduct.id : 0;

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
        }
    }

    //funcnion que agrega un producto
    addProduct = async (product) => {
        // validar que no se repita el campo code
        if (this.products.some(p => p.code === product.code)) {
            console.log("El código se repite");
            return;
        } 

        if (Object.values(product).includes(undefined)){
            console.log("Todos los campos deben estar informados");
            return;
        }
        
        ProductManager.id++;
        product.id = ProductManager.id;
        this.products.push(product);
        console.log("Producto agregado correctamente");     
       
    }

    // devuelve todos los productos
    getProductos = async () => {
        this.products.forEach(p => {
            console.log(p);
        });
    }

    // devuelve un producto por id o -1 en caso de no encontrarlo.
    getProductById = async (id) => {
        const product = this.products.find(p => p.id === id);
        console.log(product ? product : -1);
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

class Producto {
    constructor(title, description, price, thumbnail, code, stock) {  
        this.id = 0;      
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

//Implemento esta funcion main por fuera de las clases para poder ejecutar
//de forma async las funciones de clase.
async function main() {
    const carrito = new ProductManager();
    await carrito.initialize();

    await carrito.getProductos();

    const producto2 = new Producto("Teclado2", "Teclado mecanico", 250, "c:", 12346, 15);
    const producto3 = new Producto("Teclado2", "Teclado mecanico", 250, "c:", 12346, 15);
    const producto4 = new Producto("Teclado2", "Teclado mecanico", 250, "c:", 12347, 15);
    await carrito.addProduct(producto2);
    await carrito.addProduct(producto3);
    await carrito.addProduct(producto4);

    carrito.updateProduct(1,{title:"tecladaso"});
    await carrito.deleteProduct(1);

    await carrito.saveToFile();
}

main();
