const express = require("express")
const router = express.Router()

const {signUp,login,changePassword,sendOTP} = require('../controllers/Auth')
const { auth } = require("../middlewares/auth")
const {resetPassword,resetPasswordToken} =require('../controllers/ResetPassword')

//route for login
router.get('/login',auth,login);

// Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

// ******************************************************
//                 Reset Password
// ******************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

module.exports= router;

