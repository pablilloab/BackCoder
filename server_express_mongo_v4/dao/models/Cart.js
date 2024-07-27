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
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        quantity: Number,
      },
    ],
  });

cartSchema.pre("find", function() {
    this.populate("products.product");
})

export const cartModel = mongoose.model(cartCollection, cartSchema);