const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth")
const {
    updateProfile,
    getAllUserDetails,
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

router.post("/updateProfile", auth, updateProfile);
router.get("/getUserDetails/:id", auth, getAllUserDetails);

module.exports = router;