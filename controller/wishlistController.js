const Product = require("../model/Product");
const User = require("../model/User");

const wishlistRender = async (req, res) => {
    const user = await User.findOne({_id: req.user.user._id}).populate("myWishList");
    res.render("wishlist.ejs", {wishlist: user.myWishList, username: user.username});
}

const addToWishlist = async (req, res, next) => {
    const user = await User.findOne({_id: req.user.user._id}).populate("myWishList");
    const selectedProduct = await Product.findOne({_id: req.params.id});
    let found = false;
    let productInCart;

    for (let i = 0; i < user.myWishList.length; i++) {
        if(user.myWishList[i]._id.equals(selectedProduct._id)) {
            productInCart = user.myWishList[i];
            found = true;
            break   
        } 
    }
    if (found) {
        next();
    } else {
        user.addToMyWishList(req.params.id);
    }
    res.redirect("/productPage#products");
}
const deleteFromWishlist = async (req, res) => {
    const user = await User.findOne({_id: req.user.user._id})
    user.removeFromMyWishList(req.params.id);
    res.redirect("/wishlist");
}


module.exports= {
  wishlistRender,
  addToWishlist,
  deleteFromWishlist
}