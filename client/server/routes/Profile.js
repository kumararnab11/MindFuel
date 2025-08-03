const express = require("express")
const router = express.Router()

const { auth } = require("../middlewares/auth")
const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    //updateDisplayPicture,
    getEnrolledCourses,
} = require("../controllers/Profile")

// ****************************************************************************************
// *                                 Profile routes                                       *
// ****************************************************************************************
// Delete User Account
router.delete("/deleteProfile",auth, deleteAccount)
router.put("/update-profile", auth, updateProfile)
router.get("/getUser-details", auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
//router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router