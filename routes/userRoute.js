const express = require("express");
const {adminHomeRender, adminAddProduct, adminEditProductRender, adminEditProduct,adminDeleteProduct} = require("../controller/admincontroller");
const router = express.Router();

router.get("/admin", adminHomeRender);
router.post("/admin", adminAddProduct);

router.get("/admin/edit/:id", adminEditProductRender)
router.post("/admin/edit/:id", adminEditProduct)

router.get("/admin/delete/:id", adminDeleteProduct)


router.get("/", (req, res) => {
    res.send("Webshop");
})

module.exports = router;