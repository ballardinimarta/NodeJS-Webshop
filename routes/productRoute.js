const express = require("express");

const router = express.Router();

const {productPageRender} = require('../controller/productController')
const verifyUser = require('../middleware/verifyUser')

router.get('/', productPageRender) 
router.get('/productPage', verifyUser, productPageRender) 


module.exports = router;