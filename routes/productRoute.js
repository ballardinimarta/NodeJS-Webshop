const express = require("express");

const router = express.Router();

const {productPageRender, showMoreProducts, showLessProducts} = require('../controller/productController')
const verifyUser = require('../middleware/verifyUser')

router.get('/', productPageRender) 
router.get('/productPage', verifyUser, productPageRender) 

router.get('/showmore', showMoreProducts);
router.get('/showless', showLessProducts);


module.exports = router;