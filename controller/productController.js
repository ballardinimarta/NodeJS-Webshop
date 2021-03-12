const Product = require("../model/Product");
const User = require('../model/User') 
require('dotenv').config()
const jwt = require('jsonwebtoken') 

const productPageRender = async (req, res) => {
    const products = await Product.find()
    const cookie = req.cookies
    const cookieLength = Object.keys(cookie).length
  
    const loggedAsAdmin = req.user && req.user.user.role
   
    res.render('product_page.ejs', {err: '', products, cookie, cookieLength, loggedAsAdmin})
}

const productAddToCart = async (req, res) => {
    const productId = req.params.id
   
    const user = await User.findOne({_id: req.user.user._id})
    user.addToMyShoppingCart(productId) 
    res.redirect("/productPage")
}


module.exports = {
    productPageRender,
    productAddToCart,
} 