const Product = require("../model/Product");
require('dotenv').config()

const productPageRender = async (req, res) => {
    const products = await Product.find()
    res.render('product_page.ejs', {err: '', products})
}

module.exports = {
    productPageRender
} 