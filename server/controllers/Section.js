const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require('../models/SubSection')

exports.createSection = async (req, res) => {
	try {
		//data fetch
		const { sectionName, courseId } = req.body;
		//data validation
		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing Properties",
			});
		}

		//create section
		const newSection = await Section.create({ sectionName });
		//update course with section ObjectID
		const updatedCourseDetails = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		).populate({
			path:"courseContent",
			populate:{
				path:"subSection"
			}
		});

		//HW: use populate to replace section/sub-sections both in the updatedCourseDetails
		//return response
		return res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourseDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Unable to create section, please try again", // Corrected message based on common error handling practices
			error: error.message,
		});
	}
};


exports.updateSection = async (req, res) => {
	try {
		//data input
		const { sectionName, sectionId } = req.body;
		//data validation
		if (!sectionName || !sectionId) {
			return res.status(400).json({
				success: false,
				message: "Missing Properties",
			});
		}

		//update data
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);

		//return res
		return res.status(200).json({
			success: true,
			message: "Section Updated Successfully",
		});
	} catch (error) {
		// Error handling for the catch block (not fully visible in the provided image)
		return res.status(500).json({
			success: false,
			message: "Unable to update section, please try again",
			error: error.message,
		});
	}
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;

    if (!sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Section Id and Course Id are required",
      });
    }
	
    // Step 1: Delete the section
	const section = Section.findById(sectionId);
	if(!section){

	}
	if (section.subSection.length > 0) { 
		await SubSection.deleteMany({ _id: { $in: section.subSection } }); 
	}
    await Section.findByIdAndDelete(sectionId);

    // Step 2: Remove section reference from the course
    const updated = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { courseContent: sectionId } }, // Remove sectionId from array
      { new: true }
    ).populate({
			path:"courseContent",
			populate:{
				path:"subSection"
			}
		});

    return res.status(200).json({
      success: true,
      message: "Section deleted and reference removed from course",
	  updated
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete Section, please try again",
      error: error.message,
    });
  }
};
