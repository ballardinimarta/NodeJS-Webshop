const verifyTokenAdmin = require("../middleware/verifyUserAdmin")
const {upload} = require("./../middleware/upload");
const express = require("express");
const {adminHomeRender, adminAddProduct, adminEditProductRender, adminEditProduct,adminDeleteProduct} = require("../controller/admincontroller");
const router = express.Router();

router.get("/admin",verifyTokenAdmin,  adminHomeRender);
router.post("/admin",verifyTokenAdmin, upload.single("imageurl"),  adminAddProduct);

router.get("/admin/edit/:id",verifyTokenAdmin, adminEditProductRender)
router.post("/admin/edit/:id",verifyTokenAdmin,upload.single("imageurl"), adminEditProduct)

router.get("/admin/delete/:id", verifyTokenAdmin, adminDeleteProduct)

module.exports = router;