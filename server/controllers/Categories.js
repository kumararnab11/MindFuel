const Categories = require("../models/Categories");

//create Category ka handler funciton
exports.createCategory = async (req, res) => {
  try {
    //fetch data
    const { name, description } = req.body;

    //validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //create entry in DB
    const categoryDetails = await Categories.create({
      name: name,
      description: description,
    });
    console.log(categoryDetails);

    //return response
    return res.status(200).json({
      success: true,
      message: "Category Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//getAllCategories handler function
exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Categories.find({}, { name: true, description: true });
    res.status(200).json({
      success: true,
      message: "All Categories fetched successfully", 
      allCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.categoryPageDetails = async (req, res) => {
    try {
        //get categoryId
        const {categoryId} = req.body;
        //get courses for specified categoryId
        const selectedCategory = await Categories.findById(categoryId)
                                            .populate({
                                                path: "course",
                                                populate: [
                                                  { path: "instructor" },
                                                  { path: "ratingAndReviews" }
                                                ]
                                              })
                                              .exec();

        //validation
        if(!selectedCategory) {
            return res.status(404).json({
                success:false,
                message:'Data Not Found',
            });
        }

        //get courses for different categories except current categoty
        const differentCategories = await Categories.find({
                                        _id: {$ne: categoryId},
                                    })
                                    .populate("course")
                                    .exec();

        // Top Selling
        const topSellingCourses = [...selectedCategory.course]
          .sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length);

        // Newest
        const newestCourses = [...selectedCategory.course]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        //console.log(topSellingCourses);

        //return response
        return res.status(200).json({
            success:true,
            data: {
                selectedCategory,
                differentCategories,
                topSellingCourses,
                newestCourses
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}