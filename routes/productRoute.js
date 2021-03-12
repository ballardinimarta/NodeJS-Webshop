const express = require("express");

const router = express.Router();

const {productPageRender, productAddToCart} = require('../controller/productController')
const verifyUser = require('../middleware/verifyUser')

router.get('/', productPageRender) 
router.get('/productPage', verifyUser, productPageRender) 
router.get('/addToCart/:id', verifyUser, productAddToCart) 

module.exports = router;