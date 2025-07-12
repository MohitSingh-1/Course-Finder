require("dotenv").config();

const mongoose = require("mongoose");

exports.dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("DB Connected Successfully.");
    })
    .catch((err)=>{
        console.error(err);
        console.log("Error in database Connection.");

        // close the server when database connection fails
        process.exit(1);
    })
}