const Category = require("../models/Category");

// create Category
exports.createCategory = async (req, res) => {
    try {
        // fetch the categoryName and categoryDescription from the admin
        // validation 
        // create entry in the Category 

        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(500).json({
                success: false,
                message: "Please enter name and description of the Category",
            });
        }
        // create entry
        const categoryDetails = await Category.create({
            name: name,
            description: description
        })
        console.log(categoryDetails);
        return res.status(200).json({
            success: true,
            message: "Category created successfully",
        })
    } catch (err) {
        console.log("❌ Error while creating Category");
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Internal server error while Category creation",
            error: err.message,
        });
    }
}

// get all Category 
exports.getAllCategories = async (req, res) => {
    try {
        const allCategory = await Category.find({}, { name: true, description: true });
        console.log("ALLLLLL ",allCategory);

        return res.status(200).json({
            success: true,
            message: "Category extracted successfully",
            allCategory,
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal server error while Category extraction",
            error: err.message,
        });
    }
}

// category page details

exports.categoryPageDetails = async (req, res) => {
    try {
        // get categoty id
        const { categoryId } = req.body
        console.log("PRINTING CATEGORY ID: ", categoryId);
        // Get courses for the specified category
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                //   match: { status: "Published" },
                //   populate: "ratingAndReviews",
            })
            .exec()

        //console.log("SELECTED COURSE", selectedCategory)
        // Handle the case when the category is not found
        if (!selectedCategory) {
            console.log("Category not found.")
            return res
                .status(404)
                .json({ success: false, message: "Category not found" })
        }
        // Handle the case when there are no courses
        if (selectedCategory.courses.length === 0) {
            console.log("No courses found for the selected category.")
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            })
        }

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },                           // ne-> not equal to 
        })
        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
                ._id
        )
            .populate({
                path: "courses",
                //   match: { status: "Published" },
            })
            .exec()
        //console.log("Different COURSE", differentCategory)
        // Get top-selling courses across all categories

        // const allCategories = await Category.find()
        //     .populate({
        //         path: "courses",
        //         match: { status: "Published" },
        //         populate: {
        //             path: "instructor",
        //         },
        //     })
        //     .exec()
        // const allCourses = allCategories.flatMap((category) => category.courses)
        // const mostSellingCourses = allCourses
        //     .sort((a, b) => b.sold - a.sold)
        //     .slice(0, 10)
        
        // console.log("mostSellingCourses COURSE", mostSellingCourses)
        res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                // mostSellingCourses,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}