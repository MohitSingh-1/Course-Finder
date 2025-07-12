const Section = require("../models/Section");
const Course = require("../models/Course");
// CREATE a new section
exports.createSection = async (req, res) => {
	try {
		// data fetch
		// data validation
		// creating a section
		// updating the course schema -> adding this section objectId
		// return response 

		// Extract the required properties from the request body
		const { sectionName, sectionDescription, courseId } = req.body;

		// Validate the input
		if (!sectionName || !courseId || !sectionDescription) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

		// Create a new section
		const newSection = await Section.create({ sectionName, sectionDescription });

		// Add the new section to the course's content array
		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate("courseContent")
			.exec();

		// Return the updated course object in the response
		res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourse,
		});
	} catch (error) {
		// Handle errors
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

// UPDATE a section
exports.updateSection = async (req, res) => {
	try {
		// take data 
		// validate the data
		// update the data
		// return response

		const {sectionName, sectionDescription, sectionId} = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName, sectionDescription},
			{ new: true }
		);

		res.status(200).json({
			success: true,
			message: section,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// DELETE a section
exports.deleteSection = async (req, res) => {
	try {
		// get the courseId and sectionId
		// delete this sectionId from the courseContent Array
		// return response

		const { sectionId, courseId}  = req.body;

        // TODO -> Do we need to delete the entry from the course schema
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		await Section.findByIdAndDelete(sectionId);

		res.status(200).json({
			success:true,
			message:"Section deleted",
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};   