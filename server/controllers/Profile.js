const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req, res) => {
	try {
		//get data
		const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
		//get userId
		const id = req.user.id;
		//validation
		if (!contactNumber || !gender || !id) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		//find profile
		const userDetails = await User.findById(id);
		const profileId = userDetails.additionalDetails;
		const profileDetails = await Profile.findById(profileId);

		//update profile
		profileDetails.dateOfBirth = dateOfBirth;
		profileDetails.about = about;
		profileDetails.gender = gender;
		profileDetails.contactNumber = contactNumber;
		await profileDetails.save();

		//return response
		return res.status(200).json({
			success: true,
			message: "Profile Updated Successfully",
			profileDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

//delete acc

exports.deleteAccount = async (req, res) => {
	try {
		//get id
		const id = req.user.id;
		//validation
		const userDetails = await User.findById(id);
		if (!userDetails) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		//delete profile
		await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
		//TODO: HW unenroll user form all enrolled courses
		//delete user
		await User.findByIdAndDelete({ _id: id });

		//return response
		return res.status(200).json({
			success: true,
			message: "User Deleted Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "User cannot be deleted successfully", // Corrected message based on image
		});
	}
};

//get user details

exports.getAllUserDetails = async (req, res) => {
	try {
		//get id
		const id = req.user.id;

		//validation and get user details
		const userDetails = await User.findById(id).populate("additionalDetails").exec();
		//return response
		return res.status(200).json({
			success: true,
			message: "User Data Fetched Successfully",
			userDetails, // Assuming userDetails is meant to be sent in the response
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message, // The image only shows error.message for the message field
		});
	}
};

exports.getEnrolledCourses = async (req,res) =>{
	try{
		const id = req.user.id;
		//will be completed later as per requirement
		const allCourses = await User.findById({id});

		if(!allCourses){
			return res.status(400).json({
			success: false,
			message: "Error in getting courses",
		})
		}

		return res.status(200).json({
			success: true,
			message: "Profile Updated Successfully",
			allCourses,
		})
	}
	catch(error){
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}