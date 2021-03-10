const express = require("express");

const router = express.Router();

const {registerRender, registerSubmit} = require('../controller/registerController')
const {loginRender, loginSubmit, logOut} = require('../controller/loginController')


//router.get("/", (req, res) => {
    //res.send("Webshop");
//})

router.get('/register', registerRender) 
router.post('/register', registerSubmit) 

router.get('/login', loginRender) 
router.post('/login', loginSubmit) 

router.get('/logout', logOut) 


module.exports = router;