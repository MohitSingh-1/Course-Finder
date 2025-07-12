// Import the required modules
const express = require("express")
const router = express.Router()

// course controller import 
const {
    createCourse,
    getAllCourses,
    getCourseDetails,
} = require("../controllers/Coures");

// category controller import
const {
    createCategory,
    getAllCategories,
    categoryPageDetails,
} = require("../controllers/Category");

// section controller import
const {
    createSection,
    updateSection,
    deleteSection,
} = require("../controllers/Section");

// rating controller import
const {
    createRating, 
    getAllRating,
    getAverageRating,
} = require("../controllers/RatingAndReview");

// middlewares import
const {auth, isStudent, isAdmin, isInstructor} = require("../middlewares/auth");


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************


// create course only by instructor
router.post("/createCourse", auth, isInstructor, createCourse);
// add a section to a course
router.post("/addSection", auth, isInstructor, createSection);
// update a section
router.post("/updateSection", auth, isInstructor, updateSection);
// delete a section
router.post("/deleteSection", auth, isInstructor, deleteSection);

// get All registered courses
router.get("/getAllCourses", getAllCourses);
// get details of specific course
router.get("/getCourseDetails", getCourseDetails);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin

// Create a category
router.post("/createCategory", auth, isAdmin, createCategory);
// show all the available categories
router.get("/getAllCategories", getAllCategories);
// get category page details for page category of frontend
router.get("/getCategoryPageDetails", categoryPageDetails);


// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

// create a new rating and review
router.post("/createRating", auth, isStudent, createRating);
// get average ratings of a course
router.get("/getAverageRating", getAverageRating);
// get all the rating -> for the home page -> show all the best ratings
router.get("/getAllRatings", getAllRating);

module.exports = router;