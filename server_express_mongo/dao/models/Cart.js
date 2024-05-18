/*class Cart {
    constructor(cart) {  
        this.id = 0;      
        this.products = [];
    }
}

export default Cart;*/

import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    product: {
        type: Array,
        default: []
    }
});

export const cartModel = mongoose.model(cartCollection, cartSchema);