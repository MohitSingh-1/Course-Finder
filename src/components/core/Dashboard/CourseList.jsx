import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiConnector } from "../../../services/apiConnector";
import { courseEndpoints } from "../../../services/apis";
import Sidebar from "./Sidebar";

const CourseList = () => {
  const { user } = useSelector((state) => state.profile);
  const [courseList, setCourseList] = useState([]);
  const [height, setHeight] = useState(window.innerHeight - 46); // Subtract header

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight - 46); // Update on resize
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const additional = user?.additionalDetails || {};

  const fetchCourses = async () => {
    try {
      const result = await apiConnector(
        "GET",
        `${courseEndpoints.COURSE_LIST_BY_INSTRUCTOR_ID}/${user._id}`
      );
      setCourseList(result.data.data);
    } catch (err) {
      console.log("Error while fetching the calatog list : ", err);
    }
  };

const token = useSelector((state) => state.auth.token); // place this outside the function

const handleDeleteCourse = async (courseId) => {
  if (!window.confirm("Are you sure you want to delete this course?")) return;

  try {
    const response = await apiConnector(
      "DELETE",
      `${courseEndpoints.DELETE_COURSE_API}/${courseId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (response?.data?.success) {
      console.log("Course deleted successfully.");
      fetchCourses(); // refresh the list
    } else {
      console.error("Failed to delete course:", response);
    }
  } catch (err) {
    console.error("Error deleting course:", err);
  }
};


  useEffect(() => {
    if (user) {
      fetchCourses();
    }
  }, [user]);

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="w-[100%]  overflow-y-auto mb-10" style={{ height: height }}>
        <div
          style={{ height: height }}
          className="text-white md:w-8/12 px-5 md:mx-auto py-10 md:px-0 flex flex-col gap-10"
        >
          {courseList.length > 0 ? (
            courseList.map((val, ind) => {
              return (
                <div className="flex md:flex-row flex-col gap-3">
                  <a
                    key={val._id || ind}
                    target="_blank"
                    href={val.visitCourse}
                    className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <img
                      className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 mx-3 md:rounded-none md:rounded-s-lg"
                      src={val.thumbnail}
                      alt=""
                    />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {val.courseName} By {val.instructor.firstName}{" "}
                        {val.instructor.lastName}
                      </h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {val.courseDescription}
                      </p>
                      <p>{val.whatYouWillLearn}</p>
                      <div className="text-green-300 mt-2">
                        Rs: {val.price}
                      </div>
                    </div>
                  </a>
                  <button onClick={()=>handleDeleteCourse(val._id)} className="text-center items-center my-auto cursor-pointer px-6 py-3 mx-10 rounded-full bg-red-500 hover:text-black hover:bg-red-600 hover:scale-105">
                    delete
                  </button>
                </div>
              );
            })
          ) : (
            <h2 className="text-center text-white text-2xl font-semibold">
              No courses available
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
