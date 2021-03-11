const User = require('../model/User') 
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken') 
require('dotenv').config()


const loginRender = (req, res) => {
    console.log(jwtToken)
    res.render('login_form.ejs', {err: ''})
    
}

const loginSubmit = async (req, res) => {
    const {email, password} = req.body 

    try {
        const user = await User.findOne({email: email}) 
        if(!user) return res.redirect('/register')
    
        const validUser = await bcrypt.compare(password, user.password) 
        if(!validUser) return res.redirect('/login')

        const jwToken = await jwt.sign({user: user}, process.env.SECRET_KEY)
        if(jwToken) { 
            const cookie = req.cookies.jwToken
            if(!cookie) {
                res.cookie('jwToken', jwToken, {maxAge: 36000000, httpOnly: true})
            }
            return res.redirect('/productPage')
        }
        return res.redirect('/login')
    }
    catch(err) {
        if(err) 
        return res.render('login_form.ejs', {err: err})
    }
} 

const logOut = async (req, res) => {
    res.clearCookie('jwToken').redirect('/login')
}

module.exports = {
    loginRender,
    loginSubmit,
    logOut
} 