const Categories = require("../models/Categories");
const Category = require("../models/Categories");

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
        const selectedCategory = await Category.findById(categoryId)
                                            .populate("courses")
                                            .exec();

        //validation
        if(!selectedCategory) {
            return res.status(404).json({
                success:false,
                message:'Data Not Found',
            });
        }

        //get courses for different categories
        const differentCategories = await Category.find({
                                        _id: {$ne: categoryId},
                                    })
                                    .populate("courses")
                                    .exec();

        //get top selling courses
        const topSellingCourses = await Category.aggregate([
          {
              $addFields: {
                  // Add a new field 'studentsEnrolledCount' which is the size of the array
                  studentsEnrolledCount: { $size: "$studentsEnrolled" }
              }
          },
          {
              // Sort by the newly created count field in descending order
              $sort: { studentsEnrolledCount: -1 }
          },
          {
              //Limit the number of results, e.g., to get the top 10
              $limit: 10
          },
          {
              //to exclude the temporary 'studentsEnrolledCount' field
              $project: {
                  studentsEnrolledCount: 0 // Exclude this field
              }
          }
      ]);

      console.log(topSellingCourses);

        //return response
        return res.status(200).json({
            success:true,
            data: {
                selectedCategory,
                differentCategories,
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