const Product = require("../model/Product");
const User = require('../model/User') 
require('dotenv').config()
const jwt = require('jsonwebtoken') 

const productPageRender = async (req, res) => {
    const products = await Product.find()
    const cookie = req.cookies
    const cookieLength = Object.keys(cookie).length
    
   

    res.render('product_page.ejs', {err: '', products, cookie, cookieLength})
}

module.exports = {
    productPageRender
} 