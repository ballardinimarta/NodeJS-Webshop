const express = require("express");
const {adminHomeRender, adminAddProduct, adminEditProductRender, adminEditProduct,adminDeleteProduct} = require("../controller/admincontroller");
const {registerRender, registerSubmit} = require('../controller/registerController');
const {loginRender, loginSubmit, logOut} = require('../controller/loginController');
const verifyTokenAdmin = require("../middleware/verifyUserAdmin")
const router = express.Router();

router.get("/admin", verifyTokenAdmin, adminHomeRender);
router.post("/admin", verifyTokenAdmin, adminAddProduct);

router.get("/admin/edit/:id",verifyTokenAdmin, adminEditProductRender)
router.post("/admin/edit/:id",verifyTokenAdmin, adminEditProduct)

router.get("/admin/delete/:id", verifyTokenAdmin, adminDeleteProduct)

router.get('/register', registerRender) 
router.post('/register', registerSubmit) 

router.get('/login', loginRender) 
router.post('/login', loginSubmit) 

router.get('/logout', logOut) 


module.exports = router;