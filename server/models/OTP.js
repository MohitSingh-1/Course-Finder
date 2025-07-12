const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    },

});

// A function to send a mail
async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verification Email from CourseFinder", otp);
        console.log("Email sent successfully -> ",mailResponse);
    }catch(err){
        console.log("Error while sending verification mail : ",err);
        throw(err);
    }
}

// pre "save" middleware which will be called before saving the data in the database
otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP",otpSchema);