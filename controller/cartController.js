const Product = require("../model/Product");
const User = require("../model/User");


const showProducts = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user.user._id}).populate("myShoppingCart");
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const prices = [];
        user.myShoppingCart.map(product => {
            prices.push(product.price);
        })
        const totalprice = prices.reduce(reducer)
        res.render("cart.ejs", {shoppingcart: user.myShoppingCart, username: user.username, totalprice});
    } catch (error) {
        console.log(error);
    }
}

const deleteProducts = async (req,res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({_id: req.user.user._id})
        user.removeFromMyShoppingCart(id);
        res.redirect("/cart");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    showProducts,
    deleteProducts
}