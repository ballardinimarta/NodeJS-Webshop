const User = require('../model/User') 
const bcrypt = require('bcrypt') 
const crypto = require('crypto') 
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken') 
require('dotenv').config()


const mailTransporter = nodemailer.createTransport({
    // CRUDENTIAL 
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
        user: process.env.RESET_EMAIL,
        pass: process.env.RESET_PASSWORD,
    }
})

const resetRender = (req, res) => {
    res.render('reset_form.ejs', {err: ''})
}

const resetSubmit = async (req, res) => {
    const email = req.body.email

    try {
        const user = await User.findOne({email: email})
        if(!user) return res.redirect('/register')

        // TOKEN CRYPTO URL FOR RESET PASSWORD, SAVE TOKEN EXPIRATION
        const token = await crypto.randomBytes(32).toString('hex') 
        user.token = token
        user.tokenExpiration = Date.now() + 3600000 // 1HR
        await user.save()

        // NODEMAILER 
        await mailTransporter.sendMail({
            from: process.env.RESET_EMAIL,
            to: user.email,
            subject: "Reset your password, Plant Webshop",
            html: `<h2>Hello from Plant Webshop</h2></br><h3>Please click on the link <a href="http://localhost:${process.env.PORT}/reset/${user.token}" > Here</a> to reset your new password</h3>`
        })
        res.render('checkmail.ejs')
    }
    catch(err) {
        if(err) 
        return res.render('reset_form.ejs', {err: err})
    }
}

const resetParams = async (req, res) => {
    const token = req.params.token 

    try {
        const user = await User.findOne({token: token, tokenExpiration: { $gt: Date.now() }}) 

        if(!user) return res.redirect('/register')

        res.render('newreset_form.ejs', {err: '', email: user.email})
    }
    catch (err) {
        res.render('reset_form.ejs', {err: "Try again"})
    }
}

const newReset = async (req, res) => {
    const password = req.body.password 
    const email = req.body.email  

    const salt = await bcrypt.genSalt(12) 
    const hashedPassword = await bcrypt.hash(password, salt) 

    const user = await User.findOne({email: email}) 
    user.password = hashedPassword 
    user.save() 
    res.redirect('/productPage')  
}


module.exports = {
    resetRender,
    resetSubmit,
    resetParams,
    newReset
}