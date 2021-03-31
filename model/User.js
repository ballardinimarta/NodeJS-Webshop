const mongoose = require('mongoose') 

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true, minlength: 5, maxlength: 30},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: String,
    token: String,
    tokenExpiration: Date,
    myProductList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    myWishList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    myShoppingCart: [
    { name: {type: String},
    image: {type: String,},
    price: {type: Number},
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.']
        }
    }, {
        timestamps: true
    }
]
})

userSchema.methods.addToMyProductList = function (productId) {
    this.myProductList.push(productId);
    this.save();
}

userSchema.methods.removeFromMyProductList = function (productId) {
    let index = this.myProductList.indexOf(productId);
    this.myProductList.splice(index, 1);
    this.save();
}


userSchema.methods.addToMyWishList = function (productId) {
    this.myWishList.push(productId);
    this.save();
}

userSchema.methods.removeFromMyWishList = function (productId) {
    let index = this.myWishList.indexOf(productId);
    this.myWishList.splice(index, 1);
    this.save();
}


userSchema.methods.addToMyShoppingCart = function(productId) {
    this.myShoppingCart.push(productId)
    this.save()
}
userSchema.methods.removeFromMyShoppingCart = function(selectedProduct) {
    const isFound = (element) => element._id.equals(selectedProduct._id);
    let index = this.myShoppingCart.findIndex(isFound);
    this.myShoppingCart.splice(index, 1);
    this.save()
}

const User = mongoose.model('User', userSchema)
module.exports = User
