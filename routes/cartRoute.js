const express = require("express");
const verifyUser = require('../middleware/verifyUser')
const {showProducts, deleteProducts} = require("../controller/cartController");
const router = express.Router();

router.get("/cart", verifyUser ,showProducts);
router.get("/cart/delete/:id", verifyUser, deleteProducts);
module.exports = router;
