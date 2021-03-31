const Product = require("../model/Product");
const User = require("../model/User");


const showProducts = async (req, res) => {
    try {
        let totalprice;
        const user = await User.findOne({_id: req.user.user._id}).populate("myShoppingCart");
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        if(user.myShoppingCart.length === 0) {
            totalprice = 0;
        } else {
        const prices = [];
        user.myShoppingCart.map(product => {
            prices.push(product.price * product.quantity);
        })
        totalprice = prices.reduce(reducer)
        }
        res.render("cart.ejs", {shoppingcart: user.myShoppingCart, username: user.username, totalprice});
    } catch (error) {
        console.log(error);
    }
}

const deleteProducts = async (req,res) => {
    try {
        const user = await User.findOne({_id: req.user.user._id})
        const selectedProduct = await Product.findOne({_id: req.params.id});
        user.removeFromMyShoppingCart(selectedProduct);
        res.redirect("/cart");
    } catch (error) {
        console.log(error);
    }
}

const minusProducts = async (req, res) => {
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
        productInCart.quantity -= 1;
        user.save();
    } 
    else {
        user.addToMyShoppingCart(selectedProduct) 
       
    }
    res.redirect("/cart")
}

module.exports = {
    showProducts,
    deleteProducts,
    minusProducts
}