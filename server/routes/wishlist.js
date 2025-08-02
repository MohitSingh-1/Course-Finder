const express = require("express");
const { addToWishlist, getWishlist, removeFromWishlist } = require("../controllers/wishlistController");
const router = express.Router()

router.post("/addToWishlist", addToWishlist);
router.get("/getWishlist/:id", getWishlist);
router.post("/removeFromWishlist", removeFromWishlist);

module.exports = router;