const express = require("express");
const verifyUser = require('../middleware/verifyUser')
const {checkoutClicked, stripeHandler} = require("../controller/paymentController");
const router = express.Router();


router.post("/payment", verifyUser, checkoutClicked);

module.exports = router;
