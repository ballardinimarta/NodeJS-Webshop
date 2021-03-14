const Product = require("../model/Product");
const User = require("../model/User");
require("dotenv").config();
let displayNone = ""
const jwt = require("jsonwebtoken");

const productPageRender = async (req, res) => {
  const products = await Product.find()
  const allProducts = await Product.find().countDocuments();

  const cookie = req.cookies;
  const cookieLength = Object.keys(cookie).length;
  let page = +req.query.page || 1;
  const productsPerPage = 6;
  const totalPages = Math.ceil(allProducts / productsPerPage);
  const productsToShow = productsPerPage * page;

  const loggedAsAdmin = req.user && req.user.user.role;
  await Product.find()
  .limit(productsToShow)
  .exec(function (err, products) {
    res.render("product_page.ejs", {
        err: "",
        products,
        cookie,
        cookieLength,
        loggedAsAdmin,
        totalPages,
        allProducts,
        productsToShow,
        productsPerPage,
        displayNone,
        page
      });
    });

  if (allProducts <= 4) {
    displayNone = "display-none";
  }
  if (allProducts > 4) {
    displayNone = "";
  }
};

const showMoreProducts = async (req, res) => {
    let page = +req.query.page;
    let totalPages = +req.query.totalPages;
    console.log(page)
    if (totalPages === 0) {
      res.redirect("/");
    }
    await res.redirect("/?page=" + (page + 1));
  };
  
  const showLessProducts = async (req, res) => {
    await res.redirect("/?page=1");
  };

const productAddToCart = async (req, res) => {
    console.log(req.params.origin)
    const productId = req.params.id
    const user = await User.findOne({_id: req.user.user._id})
    const selectedProduct = await Product.findOne({_id: req.params.id});
    let found = false;
    let productInCart;

    for (let i = 0; i < user.myShoppingCart.length; i++) {
        if(user.myShoppingCart[i]._id.equals(selectedProduct._id)) {
            productInCart = user.myShoppingCart[i];
            found = true;
            break   
        } 
    }
    if (found) {
        productInCart.quantity += 1;
        user.save();
    } else {
        user.addToMyShoppingCart(selectedProduct) 
    }
    res.redirect("/#products")
}


module.exports = {
  productPageRender,
  showMoreProducts,
  showLessProducts,
  productAddToCart,
} 
