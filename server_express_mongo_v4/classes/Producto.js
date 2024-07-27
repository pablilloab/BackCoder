class Producto {
    constructor(product) {  
        this.id = 0;      
        this.title = product.title;
        this.description = product.description;
        this.price = product.price;
        this.thumbnails = product.thumbnails || [];
        this.code = product.code;
        this.stock = product.stock;
        this.status = product.status || true;
        this.category = product.category;

    }
}

export default Producto;