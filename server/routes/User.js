const express = require("express")
const router = express.Router()

const {signUp,login,changePassword,sendOTP, logout} = require('../controllers/Auth')
const { auth } = require("../middlewares/auth")
const {resetPassword,resetPasswordToken} =require('../controllers/ResetPassword')

//route for login
router.post('/login',login);

// Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

//Route for clearing cookie during logout
router.post("/logout",logout);

// ******************************************************
//                 Reset Password
// ******************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

module.exports= router;

