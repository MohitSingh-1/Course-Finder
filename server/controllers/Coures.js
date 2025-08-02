const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create course handler function
exports.createCourse = async (req, res) => {
  try {
    // get the data and file from the user
    // validate the data
    // validate that the user is instructor
    // check Category validity
    // upload image on cloudinary and get the image link
    // create entry in the database
    // add course entry in the USER
    //              -> if it is student then wishlisted will be stored
    //              -> it it is intructor then uploaded course will be shown
    // Add course entry in the Category database

    // get data
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      visitCourse,
      category,
    } = req.body;
    // get thumbnail
    const thumbnail = req.files.thumbnailImage;

    // validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !visitCourse ||
      !category
    ) {
      return res.json({
        success: false,
        message: "All fields are required please fill all the fields.",
      });
    }
    // validate the instructor
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    if (!instructorDetails) {
      return res.json({
        success: false,
        message: "Instructor details not found, please login as a instructor",
      });
    }
    console.log("Instructor details -> ", instructorDetails);
    // TODO -> if user.id and instructorDetails._id are same or different????

    // check category validity
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.json({
        success: false,
        message: "category details not found",
      });
    }

    // upload image to Cloudinary
    const imageUploadedDetails = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // create an entry for new course
    const newCourse = await Course.create({
      courseName: courseName,
      courseDescription,
      price: price,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      category: categoryDetails._id,
      thumbnail: imageUploadedDetails.secure_url,
      visitCourse,
    });

    console.log("New Course ====> ", newCourse._id);

    // update the USER -> add this newCourse in intructor course section
    await User.findByIdAndUpdate(
      instructorDetails._id,
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    // update the category schema
    await Category.findByIdAndUpdate(
      categoryDetails._id,
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Course created Successfully",
      data: newCourse,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error while course creating, try again",
      error: err.message,
    });
  }
};

// get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const { search } = req.query;

    // Get all courses with populated category only (no instructor)
    let allCourses = await Course.find()
      .populate("category", "name")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      });

    // If search is provided, filter manually (no instructor check)
    if (search) {
      const searchRegex = new RegExp(search, "i"); // case-insensitive

      allCourses = allCourses.filter((course) => {
        return (
          searchRegex.test(course.courseName) ||
          searchRegex.test(course.courseDescription) ||
          (course.category && searchRegex.test(course.category.name))
        );
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course extraction successful",
      data: allCourses,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error while extracting the courses, try again",
      error: err.message,
    });
  }
};

exports.getAllCoursesByInstructorId = async (req, res) => {
  try {
    // get all the courses
    // TODO -> have to change this incrementally by projecting and populte the instuctors
    const { id } = req.params;
    const allCourses = await Course.find({ instructor: id }).populate("instructor");

    return res.status(200).json({
      success: true,
      message: "Course extraction successful",
      data: allCourses,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error while extracting the courses, try again",
      error: err.message,
    });
  }
};

// get Course details
exports.getCourseDetails = async (req, res) => {
  try {
    // get the course id first
    const { courseId } = req.body;
    // find course details
    const courseDetails = await Course.find({ _id: courseId })
      .populate(
        // populate the instructor and then you get the user data and then populate additional details of that populated user data
        {
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        }
      )
      .populate("category")
      .populate("ratingAndReviews")
      .populate("courseContent")
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `could not found the course with courseId : ${courseId}`,
      });
    }
    // return response
    return (
      res.status(200),
      json({
        success: true,
        message: "Course details fetched successfully",
        data: courseDetails,
      })
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error while extracting the courses, try again",
      error: err.message,
    });
  }
};

exports.getAllCoursesByCategoryId = async (req, res) => {
  try {
    // get all the courses
    // TODO -> have to change this incrementally by projecting and populte the instuctors
    const { id } = req.params;
    const allCourses = await Course.find({ category: id }).populate("instructor");;

    return res.status(200).json({
      success: true,
      message: "Course extraction successful",
      data: allCourses,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error while extracting the courses, try again",
      error: err.message,
    });
  }
};

// update a course

// delete a course
