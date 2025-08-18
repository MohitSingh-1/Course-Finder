const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender:{
        type:String,
    },
    dateOfBirth : {
        type:String
    },
    about:{
        type:String
    },
    contactNumber: {
        type: String,
        trim: true,
        // validate: {
        //     validator: function (v) {
        //         return /^\d{10}$/.test(v); // basic 10-digit phone number validation
        //     },
        //     message: props => `${props.value} is not a valid 10-digit phone number!`
        // }
    },
})

module.exports = mongoose.model("Profile",profileSchema);