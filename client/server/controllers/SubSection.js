const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader"); // Assuming this utility exists
const cloudinary = require('cloudinary').v2;

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
		).populate({path:"subSection"})

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

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    if (!subSectionId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "subSectionId and sectionId required",
      });
    }

    // Find the subSection to get videoPublicId
    const subSection = await SubSection.findById(subSectionId, "videoPublicId");
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "Sub-section not found",
      });
    }

    // Delete video from Cloudinary
    if (subSection.videoPublicId) {
      await cloudinary.uploader.destroy(subSection.videoPublicId, {
        resource_type: "video",
      });
    }

    // Delete the subSection document
    await SubSection.findByIdAndDelete(subSectionId);

    // Remove subSection ref from Section.subSection array
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { $pull: { subSection: subSectionId } },
      { new: true }
    ).populate({ path: "subSection" });

    return res.status(200).json({
      success: true,
      message: "Sub-section deleted successfully",
      updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete sub-section, please try again",
      error: error.message,
    });
  }
};
