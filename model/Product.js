const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    quantity: {
        type: Number,
        required: true,
        min: 1}
})

const Product = mongoose.model("product", productSchema);

module.exports = Product;