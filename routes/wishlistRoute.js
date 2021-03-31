const express = require("express");
const verifyUser = require("../middleware/verifyUser")
const { wishlistRender, addToWishlist, deleteFromWishlist } = require("../controller/wishlistController");
const { productAddToCart } = require("../controller/productController");
const router = express.Router();

router.get("/wishlist", verifyUser,wishlistRender);
router.get("/addToWishlist/:id", verifyUser, addToWishlist);
router.get("/wishlist/delete/:id", verifyUser, deleteFromWishlist);
router.get("/wishlist/addtocart/:id", verifyUser, productAddToCart);

module.exports = router;