const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
    {
        sectionName:{
            type:String,
        },
        sectionDescription:{
            type:String,
        }
    }
)

module.exports = mongoose.model("Section",sectionSchema);