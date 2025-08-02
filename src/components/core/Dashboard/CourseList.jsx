import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { apiConnector } from "../../../services/apiConnector";
import { courseEndpoints } from "../../../services/apis";

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
  useEffect(() => {
    if (user) {
      fetchCourses();
    }
  }, [user]);
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="w-[100%] overflow-y-auto" style={{ height: height }}>
        <div
          style={{ height: height }}
          className="text-white w-8/12 mx-auto py-10 flex flex-col gap-10"
        >
          {courseList.length > 0 ? (
            courseList.map((val, ind) => {
              return (
                <a
                  key={val._id || ind}
                  target="_blank"
                  href={val.visitCourse}
                  className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <img
                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
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
                  </div>
                </a>
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
