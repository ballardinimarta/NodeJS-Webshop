const mongoose = require('mongoose') 

const User = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: String,
    token: String,
    tokenExpiration: Date,
})

const UserSchema = mongoose.model('User', User)
module.exports = UserSchema
