const mongoose = require('mongoose') 

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: String,
    token: String,
    tokenExpiration: Date,
    myProductList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    myShoppingCart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product" 
    }]
})

userSchema.methods.addToMyProductList = function (productId) {
    this.myProductList.push(productId);
    this.save();
}
userSchema.methods.addToMyShoppingCart = function(productId) {
    this.myShoppingCart.push(productId)
    this.save()
}

const User = mongoose.model('User', userSchema)
module.exports = User
