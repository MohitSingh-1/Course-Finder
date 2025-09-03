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
    getAllCategories,
} = require("../controllers/Category");

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

// show all the available categories
router.get("/getAllCategories", getAllCategories);
// get courses by instructor
router.get("/getAllCoursesByInstructorId/:id",auth, isInstructor, getAllCoursesByInstructorId);

module.exports = router;