const express = require("express");
const {registerRender, registerSubmit} = require('../controller/registerController');
const {loginRender, loginSubmit, logOut} = require('../controller/loginController');

const router = express.Router();

router.get('/register', registerRender) 
router.post('/register', registerSubmit) 

//router.get('/login', loginRender) 
router.post('/login', loginSubmit) 

router.get('/logout', logOut) 


module.exports = router;