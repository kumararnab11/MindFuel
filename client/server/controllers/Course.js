const Course = require("../models/Course");
const User = require("../models/User");
const Categories = require("../models/Categories"); // Assuming you have a Tag model
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//createCourse handler function
exports.createCourse = async (req, res) => {
  try {
    //fetch data
    console.log(req.body);
    const { courseName, courseDescription, whatYouWillLearn, price, category } = req.body;

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
        message: "Tag Details not found",
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
    });

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
      data: newCourse,
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