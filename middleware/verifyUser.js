const jwt = require('jsonwebtoken') 
require('dotenv').config()

const verifyToken = (req, res, next) => {
    const userToken = req.cookies.jwToken
    if(!userToken) return res.render('login_form.ejs', {err: "Log in to access the product page"})

    const validUser = jwt.verify(userToken, process.env.SECRET_KEY)
    if(validUser) {
        req.user = validUser
    }
    
    next()
}

module.exports = verifyToken