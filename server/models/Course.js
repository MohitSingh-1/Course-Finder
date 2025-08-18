const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        courseName:{
            type:String,
            required:true,
            trim:true
        },
        courseDescription:{
            type:String,
            required:true,
            trim:true,
        },
        instructor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        whatYouWillLearn:{
            type:String,
        },
        // ratingAndReviews:[
        //     {
        //         type:mongoose.Schema.Types.ObjectId,
        //         ref:"RatingAndReviews",
        //     }
        // ],
        price:{
            type:Number,
        },
        thumbnail:{
            type:String,
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category"
        },
        visitCourse:{       // to visit the course
            type:String,
        },
        // courseContent:[
        //     {
        //         type:mongoose.Schema.Types.ObjectId,
        //         ref:"Section",
        //     }
        // ],
        tag:{
            type:[String],
            required:true,
        },
        status:{
            type:String,
            enum:["Draft","Published"],
        }
    }
)

module.exports = mongoose.model("Course",courseSchema);