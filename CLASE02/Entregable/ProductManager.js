class ProductManager {
    static id = 0; //crear id autoincrementable
    
    constructor() {
        this.products = [];        
    }

    //funcnion que agrega un producto
    addProduct = (product) => {
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
        return;
    }

    // devuelve todos los productos
    getProductos = () => {
        this.products.forEach(p => {
            console.log(p);
        });
    }

    // devuelve un producto por id o -1 en caso de no encontrarlo.
    getProductById = (id) => {
        const product = this.products.find(p => p.id === id);
        console.log(product ? product : -1);
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

const carrito = new ProductManager();

const producto1 = new Producto("Teclado1", "Teclado mecanico", "c:", 12345, 15);
const producto2 = new Producto("Teclado2", "Teclado mecanico", 250, "c:", 12346, 15);
const producto3 = new Producto("Teclado3", "Teclado mecanico", 250, "c:", 12345, 15);

carrito.addProduct(producto1);
carrito.addProduct(producto2);
carrito.addProduct(producto3);

carrito.getProductos();
carrito.getProductById(15);
