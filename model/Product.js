const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {type: String, required: true, lowercase:true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true}
})

const Product = mongoose.model("product", productSchema);

module.exports = Product;
