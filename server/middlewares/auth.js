const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");


exports.auth = async (req, res, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

        // If token is missing
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first, token is missing",
            });
        }

        // Verify token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid or expired",
            });
        }

        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
};


// isStudent
exports.isStudent = async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for students only",
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified",
        })
    }
}

// isInstructor
exports.isInstructor = async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Instructor only",
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified",
        })
    }
}

// isAdmin
exports.isAdmin = async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin only",
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified",
        })
    }
}