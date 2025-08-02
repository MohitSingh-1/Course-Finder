const express = require("express");
const router = express.Router();

// import the required controllers and middlewares
const {
    sentOtp,
    signupHandler,
    loginHandler,
    changePassword,
    sendOtp
} = require("../controllers/Auth");

const {
    resetPasswordToken,
    resetPassword,
} = require("../controllers/ResetPassword");

const {auth} = require("../middlewares/auth");

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************


// Routes for Login, Signup, and Authentication

// Route for user login
router.post("/login",loginHandler);

// Route for new user signUp
router.post("/signup", signupHandler);

// Route for sending OTP to the user's email
router.post("/sendotp", sendOtp);

// Route for changing password
router.post("/changepassword/:id", auth ,changePassword);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// // Route for resetting user's password after verification
router.post("/reset-password", resetPassword);

// Export the router for use in the main application
module.exports = router;