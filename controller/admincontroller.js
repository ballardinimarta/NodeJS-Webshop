const Product = require("../model/Product");

const adminHomeRender = async(req, res) => {
    try {
        const user = await User.findOne({_id: req.user.user._id}).populate("myProductList");
        const products = await Product.find();
        res.render("admin_home.ejs", {products: user.myProductList, id: " "});
    } catch (error) {
        console.log(error)
    }
}
const adminAddProduct = async (req,res) => {
    try {
        await new Product({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price
        }).save();
        res.redirect("/admin")
    } catch (error) {
        console.log(error);
    }
}

const adminEditProductRender = async (req, res) => {
    try {
        const id = req.params.id;
        const products = await Product.find();
        res.render("admin_home.ejs", {id:id, products: products});
    } catch (error) {
        console.log(error);
    }
}

const adminEditProduct = async (req,res) => {
    try {
        await Product.updateOne({_id: req.params.id}, {
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price
        });
        res.redirect("/admin");
    } catch (error) {
        console.log(error);
    }
}

const adminDeleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await Product.deleteOne({_id: id});
        res.redirect("/admin");        
    } catch (error) {
        console.log(error);
    }
}

module.exports= {
    adminHomeRender,
    adminAddProduct,
    adminEditProductRender,
    adminEditProduct,
    adminDeleteProduct
}