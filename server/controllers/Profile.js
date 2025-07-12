const User = require("../models/User");
const Profile = require("../models/Profile");

// update the profile
exports.updateProfile = async(req, res)=>{
    try{
        // fetch the data 
        // get the userID (user id is present as we have added in payload in authenticating the user)
        // validation
        // Find the already created profile
        // update the profile
        // return response

        // get data if not given then consdering some of them as null 
        const {gender, dateOfBirth="", about="", contactNumber, profession="none"} = req.body;
        const userId = req.user.id;
        // validate the data
        if(!gender || !contactNumber || !userId){
            return res.status(400).json({
                success:false,
                message:"Please fill the gender and contactDetails",
            })
        }
        // find profile
        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails;
        const  profileDetails = await Profile.findById(profileId);

        // update profile
        profileDetails.gender = gender;
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        // return response
        return res.status(200).json({
            success:true,
            message:"Profile details updated successfully",
            profileDetails,
        })

    }catch(err){
        console.error("Error updating profile:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
    }
}

// delete Account
// TODO -> schedule the account to delete after some time automatically
exports.deleteAccount = async(req, res)=>{
    try{
        // fetch the user id
        // validation
        // delete the user's profile first
        // delete the user
        // return response

        // get data
        const userId = req.user.id;
        
        // validation
        const userDetails = await User.findById(userId);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"Unable to get the user's data",
            })
        }

        // delete profile
        await Profile.findByIdAndDelete(userDetails.additionalDetails);

        // delete the user
        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success:true,
            message:"User account deleted successfully",
        })

    }catch(err){
        console.error("Error deleting the account:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
    }
}

exports.getAllUserDetails = async(req, res)=>{
    try{
        // get the user id
        // get the profile id
        // get the profile details
        // return response 

        // get id
        const userId = req.user.id;
        // const profileId = await User.findById(userId);
        // const profileDetails = await Profile.findById(profileId)

        const userDetails = await User.findById(userId).populate("additionalDetails").exec();


        // return res
        return res.status(200).json({
            success:true,
            message:"successfully got the user's profile data",
            userDetails,
        })
    }catch(err){
        console.error("Error while extracting the account:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
    }
}