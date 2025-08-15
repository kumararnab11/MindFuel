const Course = require("../models/Course");
const User = require("../models/User");
const Categories = require("../models/Categories"); // Assuming you have a Tag model
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Section = require('../models/Section')
const SubSection = require('../models/SubSection')

//createCourse handler function
exports.createCourse = async (req, res) => {
  try {
    //fetch data
    console.log(req.body);
    const { courseName, courseDescription, whatYouWillLearn, price, category } = req.body;
    const instruction= JSON.parse(req.body.instruction);
    const tag= JSON.parse(req.body.tag);
    //get thumbnail
    const thumbnail = req.files.thumbnail;

    if(!thumbnail)console.log("no");

    //validation
    if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //check for instructor
    const userId = req.user.id; // Assuming user ID is available in req.user.id from authentication middleware
    const instructorDetails = await User.findById(userId);
    console.log("Instructor Details: ", instructorDetails);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details not found",
      });
    }

    //check given tag is valid or not
    const categoryDetails = await Categories.findById(category); // Assuming 'tag' is the ID of the tag
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details not found",
      });
    }

    //Upload Image to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //create an entry for New Course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      tag,
      instruction
    });

    //add new course in categories

    await Categories.findByIdAndUpdate(
      category,
      {
        $push: { course: newCourse._id } 
      },
      { new: true }
    );

    //add the new course to the user schema of Instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    //return response
    return res.status(200).json({
      success: true,
      message: "Course Created Successfully",
      newCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create Course",
      error: error.message,
    });
  }
};

//update Course

exports.updateCourse = async (req, res) => {
  const { courseId, ...updates } = req.body;

  if (!courseId) {
    return res.status(400).json({ 
      success: false,
      message: "CourseId is required for updating the course."
    });
  }

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId, 
      updates,  
      { new: true} 
    )
    .populate({
      path: "courseContent",
      populate: {
        path: "subSection"
      }
    })
    .exec(); 

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course updated successfully.",
      updatedCourse
    });
  } catch (error) {
    console.error(error); 
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the course.",
      error: error.message
    });
  }
};

//find all courses

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor") // Populate the 'instructor' field
      .exec();

    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched successfully", // Corrected message
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot Fetch course data",
      error: error.message,
    });
  }
};

//get course details

exports.getCourseDetails = async (req, res) => {
    try {
        //get id
        const {courseId} = req.body;
        //find course details
        const courseDetails = await Course.find(
                                    {_id:courseId})
                                    .populate(
                                        {
                                            path:"instructor",
                                            populate:{
                                                path:"additionalDetails",
                                            },
                                        }
                                    )
                                    .populate("category")
                                    .populate("ratingAndReviews")
                                    .populate({
                                        path:"courseContent",
                                        populate:{
                                            path:"subSection",
                                        },
                                    })
                                    .exec();

        //validation
        if(!courseDetails) {
            return res.status(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`,
            });
        }
        //return response
        return res.status(200).json({
            success:true,
            message:"Course Details fetched successfully",
            data:courseDetails,
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.getInstructiorCourses = async (req, res) => {
  console.log(req.body)
  const { instructorId } = req.body;

  if (!instructorId) {
    return res.status(400).json({
      success: false,
      message: "instructorId is required for fetching the instructor's courses.",
    });
  }

  try {
    const allCourses = await Course.find({ instructor: instructorId }).populate('category');

    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch course data",
      error: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required.",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    if (course.studentsEnrolled?.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete this course because students are already enrolled.",
      });
    }

    // If the course has sections
    if (course.courseContent.length > 0) {
      const sections = await Section.find({ _id: { $in: course.courseContent } });

      // Delete all subsections inside each section
      for (const section of sections) {
        if (section.subSection.length > 0) {
          await SubSection.deleteMany({ _id: { $in: section.subSection } });
        }
      }

      // Delete all sections
      await Section.deleteMany({ _id: { $in: course.courseContent } });
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId);

    // Remove course from instructor's list
    await User.findByIdAndUpdate(course.instructor, {
      $pull: { courses: courseId },
    });

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully.",
    });

  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the course.",
    });
  }
};

