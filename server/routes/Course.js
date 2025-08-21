// Import the required modules
const express = require("express")
const router = express.Router()

// course controller import 
const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    getAllCoursesByInstructorId,
    getAllCoursesByCategoryId,
    deleteCourse
} = require("../controllers/Coures");

// category controller import
const {
    createCategory,
    getAllCategories,
    categoryPageDetails,
} = require("../controllers/Category");

// section controller import
// const {
//     createSection,
//     updateSection,
//     deleteSection,
// } = require("../../../extra_for_future/Controllers/Section");

// rating controller import
// const {
//     createRating, 
//     getAllRating,
//     getAverageRating,
// } = require("../controllers/RatingAndReview");

// middlewares import
const {auth, isStudent, isAdmin, isInstructor} = require("../middlewares/auth");


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************


// create course only by instructor
router.post("/createCourse", auth, isInstructor, createCourse);

// get All registered courses
router.get("/getAllCourses", getAllCourses);

// get courses by category id
router.get("/getAllCoursesByCategoryId/:id", getAllCoursesByCategoryId);

// delete course
router.delete("/deleteCourse/:id",auth, isInstructor, deleteCourse);

// get details of specific course
router.get("/getCourseDetails", getCourseDetails);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin

// Create a category
router.post("/createCategory",  createCategory);
// show all the available categories
router.get("/getAllCategories", getAllCategories);
// get courses by instructor
router.get("/getAllCoursesByInstructorId/:id", getAllCoursesByInstructorId);
// get category page details for page category of frontend
router.get("/getCategoryPageDetails", categoryPageDetails);

module.exports = router;