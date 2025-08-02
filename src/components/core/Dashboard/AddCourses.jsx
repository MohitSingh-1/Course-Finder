import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import axios from "axios";
import { categories, courseEndpoints } from "../../../services/apis";
import { apiConnector } from "../../../services/apiConnector";
import { useNavigate } from "react-router-dom";

const AddCourses = () => {
  const { user } = useSelector((state) => state.profile);
  const instructorId = user?._id;
  const [subLinks, setSubLinks] = useState([]);
  const navigate = useNavigate();
  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.allCategory);
    } catch (err) {
      console.log("Error while fetching the calatog list : ", err);
    }
  };
  useEffect(() => {
    fetchSublinks();
  }, []);
  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    whatYouWillLearn: "",
    price: "",
    thumbnail: "",
    category: "",
    visitCourse: "",
    tag: "",
    status: "Draft",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append("courseName", formData.courseName);
    form.append("courseDescription", formData.courseDescription);
    form.append("whatYouWillLearn", formData.whatYouWillLearn);
    form.append("price", formData.price);
    form.append("visitCourse", formData.visitCourse);
    form.append("category", formData.category);
    form.append("status", formData.status);
    form.append("tag", formData.tag); 
    form.append("thumbnailImage", formData.thumbnail); 

    try {
      const result = await apiConnector(
        "POST",
        courseEndpoints.CREATE_COURSE_API,
        form
      );
      if (result.status == 200) {
        navigate("/dashboard/course-list");
      }
    } catch (err) {
      console.log("Error while fetching the calatog list : ", err);
    }
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-900">
      <Sidebar />
      <div className="text-white w-7/12 mx-auto py-10 flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-center">Add New Course</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Course Name */}
          <input
            type="text"
            name="courseName"
            placeholder="Course Name"
            value={formData.courseName}
            onChange={handleChange}
            required
            className="p-2 rounded bg-transparent text-white border border-white placeholder-gray-400"
          />

          {/* Description */}
          <textarea
            name="courseDescription"
            placeholder="Course Description"
            value={formData.courseDescription}
            onChange={handleChange}
            required
            rows={4}
            className="p-2 rounded bg-transparent text-white border border-white placeholder-gray-400"
          />

          {/* What You Will Learn */}
          <textarea
            name="whatYouWillLearn"
            placeholder="What You Will Learn"
            value={formData.whatYouWillLearn}
            onChange={handleChange}
            rows={2}
            className="p-2 rounded bg-transparent text-white border border-white placeholder-gray-400"
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="p-2 rounded bg-transparent text-white border border-white placeholder-gray-400"
          />

          {/* Visit Course URL */}
          <input
            type="text"
            name="visitCourse"
            placeholder="Visit Course URL"
            value={formData.visitCourse}
            onChange={handleChange}
            className="p-2 rounded bg-transparent text-white border border-white placeholder-gray-400"
          />

          {/* Category ID */}
          <select
            name="category"
            placeholder="Category ID"
            value={formData.category}
            onChange={handleChange}
            className="p-2 rounded bg-transparent text-white border border-white placeholder-gray-400"
          >
            <option className="p-2 rounded bg-transparent text-black border border-white placeholder-gray-400">
              Select Category
            </option>
            {subLinks.length > 0 &&
              subLinks.map((val, ind) => (
                <option
                  className="p-2 rounded bg-transparent text-black border border-white placeholder-gray-400"
                  value={val._id}
                >
                  {val.name}
                </option>
              ))}
          </select>

          {/* Tags */}
          <input
            type="text"
            name="tag"
            placeholder="Tags (comma separated)"
            value={formData.tag}
            onChange={handleChange}
            required
            className="p-2 rounded bg-transparent text-white border border-white placeholder-gray-400"
          />

          {/* Thumbnail URL */}
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                thumbnail: e.target.files[0],
              }))
            }
            required
            className="p-2 rounded bg-transparent text-white border border-white placeholder-gray-400"
          />

          {/* Status */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="p-2 rounded bg-transparent text-white border border-white"
          >
            <option value="Draft" className="bg-gray-800 text-white">
              Draft
            </option>
            <option value="Published" className="bg-gray-800 text-white">
              Published
            </option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition-all font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourses;
