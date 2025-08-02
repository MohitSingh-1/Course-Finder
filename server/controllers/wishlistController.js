const Course = require("../models/Course");
const Wishlist = require("../models/WishList");


// Add a course to the wishlist
exports.addToWishlist = async (req, res) => {
  try {
    // const userId = req.user.id; // assuming you're using auth middleware
    console.log(req.body)
    const { courseId, userId } = req.body;

    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return res.status(404).json({ message: "Course not found" });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: userId, Course: [courseId] });
    } else {
      if (wishlist.courses.includes(courseId)) {
        return res.status(400).json({ message: "Course already in wishlist" });
      }
      wishlist.courses.push(courseId);
      await wishlist.save();
    }

    return res.status(200).json({ message: "Course added to wishlist", wishlist });
  } catch (error) {
    return res.status(500).json({ message: "Error adding to wishlist", error: error.message });
  }
};

// Get user's wishlist
exports.getWishlist = async (req, res) => {
  try {
    const userId = req.params.id;

     const wishlist = await Wishlist.findOne({ user: userId }).populate({
      path: "courses",
      populate: {
        path: "instructor",
        model: "User",
      },
    });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    return res.status(200).json({ wishlist });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching wishlist", error: error.message });
  }
};

// Remove a course from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.courses = wishlist.courses.filter(
      (course) => course.toString() !== courseId
    );
    await wishlist.save();

    return res.status(200).json({ message: "Course removed from wishlist", wishlist });
  } catch (error) {
    return res.status(500).json({ message: "Error removing from wishlist", error: error.message });
  }
};
