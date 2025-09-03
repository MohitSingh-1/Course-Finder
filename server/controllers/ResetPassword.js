const User = require("../models/User");
const mailSender = require("../utils/mailSender");
require("dotenv").config();
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// generate Token for password reset
exports.resetPasswordToken = async(req, res)=>{
    try{
        // get email from the body
        // validate the email
        // check if email exists or not
        // generate token
        // update user data by adding token and expiration time in the database
        // generate link
        // send back the link by mail to the user

        // get email
        const {email} = req.body;

        // validate
        if(!email){
            return res.status(400).json({
                success:false,
                message:"Enter a valid email to reset password"
            })
        }
        // check if email exists
        const user = await User.findOne({email:email});
        // user not present
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Enterted email is not registered"
            })
        }

        // generate token
        const token = crypto.randomUUID();

        // add the token and expiry time in the user's data
        const updatedDetails = await User.findOneAndUpdate(
            {email:email},
            {
                token : token,
                resetPasswordExpires:Date.now() + (5*60*1000),
            },
            {new:true}  // updated document return hoga otherwise old document return hoga from the database
        )
        // link generate
        const url = `https://course-finder-nu.vercel.app/update-password/${token}`;

        // send mail 
        await mailSender(email,"CourseFinder Password Reset Link",`Password Reset Link : ${url}`)

        // return response
        res.status(200).json({
            success:true,
            message:"Password reset link sent successfully to your mail"
        })

    }catch(err){
        console.log("error while password reset : ",err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while password reset",
        })
    }
}

// resetPassword
exports.resetPassword = async (req,res)=>{
    try{
        // fetch the data -> token, password, confirmPasssword
        // validation
        // get user details from the database using token 
        // if token exists in the database
        // if token is expired or not
        // hash the password and update in the user
        // return response

        // fetch data
        const {token, password, confirmPassword} = req.body;    // frontend ne token ko parameters me se leke body me put karke bhejega 

        // validation
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirm Password does not match",
            })
        }
        // get user details
        const userDetails = await User.findOne({token : token});
        // if token is invalid and user not exist for that token
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"Token is invalid",
            })
        }

        // Token is expired
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success:false,
                message:"Token is expired please regenerate the password reset link",
            })
        }

        // hash the password
        const hashedPasssword = await bcrypt.hash(password, 10);

        // password update in the database
        const updatedDetails = await User.findOneAndUpdate(
            {token:token},
            {password:hashedPasssword},
            {new:true},
        )
        // send back the response
        return res.status(200).json({
            success:true,
            message:"Password reset successful, now try login",
        })

    }catch(err){
        console.log("error while password reset : ",err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while password reset",
        })
    }

}