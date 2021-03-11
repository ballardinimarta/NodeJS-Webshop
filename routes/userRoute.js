const express = require("express");
const {adminHomeRender, adminAddProduct, adminEditProductRender, adminEditProduct,adminDeleteProduct} = require("../controller/admincontroller");
const {registerRender, registerSubmit} = require('../controller/registerController');
const {loginRender, loginSubmit, logOut} = require('../controller/loginController');
const router = express.Router();

router.get("/admin", adminHomeRender);
router.post("/admin", adminAddProduct);

router.get("/admin/edit/:id", adminEditProductRender)
router.post("/admin/edit/:id", adminEditProduct)

router.get("/admin/delete/:id", adminDeleteProduct)

router.get('/register', registerRender) 
router.post('/register', registerSubmit) 

router.get('/login', loginRender) 
router.post('/login', loginSubmit) 

router.get('/logout', logOut) 


module.exports = router;