const express = require("express");
const {registerRender, registerSubmit} = require('../controller/registerController');
const {loginRender, loginSubmit, logOut} = require('../controller/loginController');
const {resetRender, resetSubmit, resetParams, newReset} = require('../controller/resetController');

const router = express.Router();

router.get('/register', registerRender) 
router.post('/register', registerSubmit) 

//router.get('/login', loginRender) 
router.post('/login', loginSubmit) 

router.get('/logout', logOut) 

router.get('/reset', resetRender) 
router.post('/reset', resetSubmit) 
router.get('/reset/:token', resetParams) 
router.post('/newReset', newReset)


module.exports = router;