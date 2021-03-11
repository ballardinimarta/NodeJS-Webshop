const Product = require("../model/Product");
const User = require("../model/User");

const adminHomeRender = async(req, res) => {
    try {
        const user = await User.findOne({_id: req.user.user._id}).populate("myProductList");
        res.render("admin_home.ejs", {products: user.myProductList, id: " "});
    } catch (error) {
        console.log(error)
    }
}
const adminAddProduct = async (req,res) => {
    try {
        const user = await User.findOne({_id: req.user.user._id})
        const product = await new Product({
            name: req.body.name,
            image: "/uploads/" + req.file.filename,
            description: req.body.description,
            price: req.body.price
        }).save();
        user.addToMyProductList(product._id);
        res.redirect("/admin")
    } catch (error) {
        console.log(error);
    }
}

const adminEditProductRender = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({_id: req.user.user._id}).populate("myProductList");
        res.render("admin_home.ejs", {id:id, products: user.myProductList});
    } catch (error) {
        console.log(error);
    }
}

const adminEditProduct = async (req,res) => {
    try {
        if (req.file == undefined) {
            console.log("undefined");
            await Product.updateOne({_id: req.params.id}, {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
            });
        }else {
            console.log("defined");
            await Product.updateOne({_id: req.params.id}, {
                name: req.body.name,
                image: "/uploads/" + req.file.filename,
                description: req.body.description,
                price: req.body.price,
            });
        }
        
        res.redirect("/admin");
    } catch (error) {
        console.log(error);
    }
}

const adminDeleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await Product.deleteOne({_id: id});
        setTimeout(function(){ document.getElementById }, 3000);       
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