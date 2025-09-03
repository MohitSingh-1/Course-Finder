const express = require("express");
const app = express();
const userRoutes = require("./routes/User");
const contactRoutes = require("./routes/Contact");
const AI_Search = require("./routes/AI_Search");
const courseRoutes = require("./routes/Course");
const profileRoutes = require("./routes/Profile");
const wishlist = require("./routes/wishlist");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const {cloudinaryConfig} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const cors = require("cors");
const PORT = process.env.PORT || 4000;

// connect with cloudinary
cloudinaryConfig();
// connect with the database
database.dbConnect();

// middlewares
app.use(cookieParser());
app.use(express.json());    // middleware for parsing the data into json

app.use(
	cors({
		origin:"https://course-finder-nu.vercel.app",
		origin:"http://localhost:5173",
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
app.use("/api/v1/wishlist", wishlist); 
app.use("/api/v1/aisearch", AI_Search);

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