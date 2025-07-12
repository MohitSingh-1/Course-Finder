const User = require("../models/User");
const Profile = require("../models/Profile");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// send otp
exports.sendOtp = async(req,res)=>{
    try{
        // fetch email from body
        const {email} = req.body;

        // checking if user already exists
        const checkUserPresent = await User.findOne({email});

        // if already exist
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User Already Exists"
            })
        }

        // generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            specialChars:false,
            lowerCaseAlphabets:false
        })
        console.log("OTP generated : ",otp);

        // check unique otp or not
        const result = await OTP.findOne({otp:otp});

        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets:false,
                specialChars:false,
                lowerCaseAlphabets:false
            })
            result = await OTP.findOne({otp:otp});
        }

        const otpPayload = {email, otp};

        // make entry in the database
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        res.status(200).json({
            success:true,
            message:"OTP sent successfully",
        })

    }catch(err){
        condole.log("Error while sending otp : ",err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

// signup
exports.signupHandler = async (req,res)=>{
    try{
        // fetch data from the request body
        // validate the email and password
        // match if password and confirmPassword are same
        // check is user already exist 
        // find most recent OTP stored for the user
        // validate the otp
        // hash the password
        // create an entry in the database
        // return response

        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        // validate the data
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"All field are required",
            })
        }

        // matching the password
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirm Password does not match",
            })
        }

        // check if email already registered
        const isPresent = await User.findOne({email:email});

        // if user already present
        if(isPresent){
            return res.status(400).json({
                success:false,
                message:"User already registered",
            });
        }

        // find most recent OTP
        console.log("lola lola ",otp);
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);    // only 1 otp and recent otp fetch
        console.log("Recent otp is : ",recentOtp);

        // validate otp
        if(recentOtp.length == 0){
            // return otp not found
            return res.status(400).json({
                success:false,
                message:"Otp Not found",
            })
        }else if(otp !== recentOtp[0].otp){
            // invalid OTP
            return res.status(400).json({
                success:false,
                message:"Invalid otp",
            })
        }

        // if user not present and otp also varified
        // encrypt the passwrod
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,10);
        }catch(err){
            console.log("Error while password encryption");
        }

        // create a new profile for this new user
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        })

        // insert the data in the database
        const newUser = await User.create(
            {
                firstName,
                lastName,
                email,
                contactNumber,
                password:hashedPassword,
                accountType,
                additionalDetails : profileDetails._id,
                image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            }
        )

        res.status(200).json(
            {
                success:true,
                message:"User created successfully",
                data:newUser,
            }
        )
    }catch(err){
        console.log("❌ Error while creating user : ",err);
        
        return res.status(500).json({
            success: false,
            message: "Internal server error while creating User",
            error: err.message,
        });
    }
}

// login
exports.loginHandler = async (req,res)=>{
    try{
        // fetch the data from the user body
        // validate the data
        // check if user exist or not
        // match the password
        // generate the jwt token
        // create cookie and send back the response
        
        // fetch data
        const {email, password} = req.body;
        // validate data
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Enter email and password"
            })
        }
        const user = await User.findOne({email:email});
        
        // if user does not exist
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid Username or password"
            })
        }

        // if user exist
        // password checking
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        // password does not match
        if(!isPasswordMatch){
            return res.status(401).json(
                {
                    success:false,
                    message:"Password does not match"
                }
            )
        }
        
        // password matches -> creating JWT token 
        const payload = {
            email:user.email,
            id:user._id,
            accountType:user.accountType
        }
        let token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn:"3h"
            }
        )
        
        user.token = token;
        user.password = undefined;
        const options = {
            expires:new Date(Date.now() + (3*24*60*60*1000)),
            httpOnly:true,
        }
        res.cookie("token",token, options).status(200).json({
            success:true,
            user,
            token,
            message:"User login successfull.",
        });

    }catch(err){
        console.log("❌ Error while user login");
        console.error(err);
        
        return res.status(500).json({
            success: false,
            message: "Internal server error while creating User",
            error: err.message,
        });
    }
}

// change password
exports.changePassword = async(req,res)=>{
    // get data from user -> oldPassword, newPassword, confirmNewPassword
    // validate the data
    // update password in database
    // send mail -> password updated
    // return response

    // get data
    const {oldPassword, newPassword, confirmNewPassword} = req.body;

    //validate
    if(!oldPassword || !newPassword || !confirmNewPassword){
        return res.status(400).json({
            success:false,
            message:"please fill all the fields"
        })
    }
    
    // 
}







