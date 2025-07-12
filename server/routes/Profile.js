const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth")
const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

// delete user account
router.delete("/deleteProfile", auth, deleteAccount);
router.post("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getAllUserDetails);

module.exports = router;