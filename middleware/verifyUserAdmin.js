const jwt = require('jsonwebtoken') 
require('dotenv').config()

const verifyTokenAdmin = (req, res, next) => {
    const userToken = req.cookies.jwToken
    if(!userToken) return res.render('login_form.ejs', {err: "Log in to access the Admin page"})

    const validUser = jwt.verify(userToken, process.env.SECRET_KEY)
    if(!validUser.user.role) return res.render("login_form.ejs", {err:"You have no authorisation as an admin"})
    req.user = validUser;    
    next()
}

module.exports = verifyTokenAdmin
// CODES TO ASK FOR VERIFING IN THE FIRST PAGE