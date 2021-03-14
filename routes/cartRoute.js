const express = require("express");
const verifyUser = require('../middleware/verifyUser')
const {showProducts, deleteProducts, plusProducts, minusProducts} = require("../controller/cartController");
const router = express.Router();

router.get("/cart", verifyUser ,showProducts);
router.get("/cart/delete/:id", verifyUser, deleteProducts);
router.get("/plus/:id", verifyUser, plusProducts);
router.get("/minus/:id", verifyUser, minusProducts);
module.exports = router;
