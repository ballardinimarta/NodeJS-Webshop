const express = require("express");
const router = express.Router();
const {productPageRender, showMoreProducts, showLessProducts, productAddToCart} = require('../controller/productController')
const verifyUser = require('../middleware/verifyUser')

router.get('/', productPageRender) 
router.get('/productPage', verifyUser, productPageRender) 
router.get('/showmore', showMoreProducts);
router.get('/showless', showLessProducts);
router.get('/addToCart/:id', verifyUser, productAddToCart) 

module.exports = router;