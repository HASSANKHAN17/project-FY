  
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    quantity: { type: Number, required: true },
    type: { type: String, required: true },         //boooks, stationery etc
    category: { type: String, required: true },     //nursary, 11 , 12
    productImage: { type: String, required: true }
},
{ timestamps: true }
);

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;