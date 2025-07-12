const RatingAndReviews = require("../models/RatingAndReviews");
const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");

// create rating
exports.createRating = async(req, res)=>{
    try{
        // get the rating, review, userId, courseId.
        // check if student already reviewed the course
        // create rating and review
        // update the course on which this is being rated
        // update the user who rated (add in the rating array)

        // get data
        const userId = req.user.id;
        const {rating, review, courseId} = req.body;

        // check if user already rated this course
        const isAlreadyRated = await RatingAndReviews.findOne({user:userId, course:courseId});
        if(isAlreadyRated){
            return res.status(404).json({
                success:true,
                message:"you have already rated this course",
            })
        }

        // create rating and review
        const newRating = await RatingAndReviews.create(
            {
                user:userId,
                course:courseId,
                rating:rating,
                review:review,
            }
        )

        // update course rated
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
            {
                $push:{
                    ratingAndReviews:newRating._id,
                }
            },{new:true},
        )
        console.log("Updated course details ===> ",updatedCourseDetails);

        // update user rating array
        await User.findByIdAndUpdate({_id:userId},
            {
                $push:{
                    reviews:newRating._id,
                }
            },{new:true},
        )

        // return response
        return res.status(200).json({
            success:true,
            message:"Course rated successfully",
            newRating,
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Internal server error while registering the rating of the course, try again",
            error: err.message,
        });
    }
}


// get average rating
exports.getAverageRating = async(req, res)=>{
    try{
        // get the course id
        const courseId = req.body.courseId;

        // calculate the average rating
        const result = await RatingAndReviews.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                }
            },
            {       
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ])
        // return the average rating
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }

        // if no rating/ review exists
        return res.status(200).json({
            success:true,
            message:"Average rating is zero, no rating given till now",
            averageRating:0,
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Internal server error while extracting the average rating of the course, try again",
            error: err.message,
        });
    }
}


// get all rating and reviews without any criteria
exports.getAllRating = async(req, res)=>{
    try{
        const allRatings = await RatingAndReviews.find({})
                                                  .sort({rating:"desc"})
                                                  .populate({
                                                    path:"user",
                                                    select:"firstName lastName email image",         // we tell ki we just need these things of the user so when you get all the details of the user after populating then just give me these details
                                                  })
                                                  .populate({
                                                    path:"course",
                                                    select:"courseName"
                                                  })
                                                  .exec();
        return res.status(200).json({
            success:true,
            message:"Successfully get all the ratings and riviews",
            data:allRatings,
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Internal server error while extracting all the rating of the course, try again",
            error: err.message,
        });
    }
}