const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader"); // Assuming this utility exists

//create SubSection
exports.createSubSection = async (req, res) => {
	try {
		//fecth data from Req body
		const { sectionId, title, timeDuration, description } = req.body;
		//extract file/video
		const video = req.files.videoFile;
		//validation
		if (!sectionId || !title || !timeDuration || !description || !video) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		//upload video to cloudinary
		const uploadDetails = await uploadImageToCloudinary(
			video,
			process.env.FOLDER_NAME
		);
		//create a sub-section
		const SubSectionDetails = await SubSection.create({
			title: title,
			timeDuration: timeDuration,
			description: description,
			videoUrl: uploadDetails.secure_url,
			videoPublicId: uploadDetails.public_id
		});

		//update section with this sub section ObjectID
		const updatedSection = await Section.findByIdAndUpdate(
			{ _id: sectionId },
			{
				$push: {
					subSection: SubSectionDetails._id,
				},
			},
			{ new: true }
		);

		//HW: log updated section here, after adding populate query
		//return response
		return res.status(200).json({
			succcess: true,
			message: "Sub Section Created Successfully",
			updatedSection,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error: Unable to create sub-section", // Corrected error message
			error: error.message,
		});
	}
};

//update fn is incomplete bcz i dont know how the update will work 
// and about the req.body and req,file data

exports.updateSubSection = async (req,res)=>{
	try{
		//fecth data from Req body
		const { subSectionId, title, timeDuration, description } = req.body;
		//extract file/video
		const video = req.files.videoFile;
		//validation
		if (!subSectionId || !title || !timeDuration || !description || !video) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		//delete prev video from cloudinary

		deleteVideoByUrl(video);

		//upload video to cloudinary
		const uploadDetails = await uploadImageToCloudinary(
			video,
			process.env.FOLDER_NAME
		);

	}
	catch(error){
		return res.status(500).json({
			success: false,
			message: "Unable to update subSection, please try again",
			error: error.message,
		});
	}
}

//delete

exports.deleteSubSection = async (req,res)=>{
	try{
		const {subSectionId}=req.body;

		if(!subSectionId){
			return res.status(400).json({
				success: false,
				message: "subSectionId required",
			}); 
		}

		//deleting video from cloudinary

		const subSection = await SubSection.findById(subSectionId, "videoPublicId");

		if(subSection?.videoPublicId){
			await cloudinary.uploader.destroy(subSection.videoPublicId, {
			resource_type: "video",
			});
		}
		
		//deleteing subsection
		await SubSection.findByIdAndDelete(subSectionId);

		return res.status(200).json({
			success: true,
			message: "subSection Deleted Successfully",
		});
	}
	catch(error){
		return res.status(500).json({
			success: false,
			message: "Unable to delete subSection, please try again",
			error: error.message,
		});
	}
}