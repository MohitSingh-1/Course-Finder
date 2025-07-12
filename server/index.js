const express = require("express");
const app = express();
const userRoutes = require("./routes/User");
const contactRoutes = require("./routes/Contact");
const courseRoutes = require("./routes/Course");
const profileRoutes = require("./routes/Profile");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const {cloudinaryConfig} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
// // why i need this?
const cors = require("cors");
const PORT = process.env.PORT || 4000;

// connect with cloudinary
cloudinaryConfig();
// connect with the database
database.dbConnect();

// middlewares
app.use(cookieParser());
app.use(express.json());    // middleware for parsing the data into json
// frontend at 3000 port number will be entertained
app.use(
	cors({
		origin:"https://course-finder-u031.onrender.com",
		credentials:true,
	})
);
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

// routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/reach", contactRoutes);

// default routes
app.get("/",(req, res)=>{
    return res.json({
		success:true,
		message:'Your server is up and running....'
	});
})

app.listen(PORT,()=>{
    console.log(`Server is started at ${PORT}`);
})