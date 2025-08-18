import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link, useLocation } from "react-router-dom";
import { courseEndpoints, wishlistEndpoints } from "../../../services/apis";
import { apiConnector } from "../../../services/apiConnector";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

const Courses = () => {
  const { token } = useSelector((state) => state.auth);
  const [courseList, setCourseList] = useState([]);
  const [wishList, setWishList] = useState([]);
  const location = useLocation();
  let categoryId = location?.state?.id;

  const [height, setHeight] = useState(window.innerHeight - 46);


  const fetchCourses = async () => {
    try {
      const result = await apiConnector(
        "GET",
        `${courseEndpoints.COURSE_LIST_BY_CATEGORY_ID}/${categoryId}`
      );
      setCourseList(result.data.data);
    } catch (err) {
      console.log("Error while fetching the calatog list : ", err);
    }
  };


  useEffect(() => {
    fetchCourses();
  }, [categoryId]);

  const fetchWishList = async () => {
    let user = localStorage.getItem("user");
    if (user) {
      let parsedUser = JSON.parse(user);
      try {
        const result = await apiConnector(
          "GET",
          `${wishlistEndpoints.GET_WISHLIST}/${parsedUser._id}`
        );

        setWishList(result.data.wishlist.courses);
      } catch (err) {
        console.log("Error while fetching the calatog list : ", err);
      }
    }
  };
  
  useEffect(() => {
    fetchWishList();
  }, []);


  const addWishList = async (value) => {
    let user = localStorage.getItem("user");
    if (user) {
      let parsedUser = JSON.parse(user);
      let data = {
        courseId: value._id,
        userId: parsedUser._id,
      };
      try {
        const result = await apiConnector(
          "POST",
          `${wishlistEndpoints.ADD_WISHLIST}`,
          data
        );
        if (result.status == 200) {
          fetchWishList();
        }
      } catch (err) {
        console.log("Error while fetching the calatog list : ", err);
      }
    }
  };
  const removeWishList = async (value) => {
    let user = localStorage.getItem("user");
    if (user) {
      let parsedUser = JSON.parse(user);
      let data = {
        courseId: value._id,
        userId: parsedUser._id,
      };
      try {
        const result = await apiConnector(
          "POST",
          `${wishlistEndpoints.REMOVE_WISHLIST}`,
          data
        );
        if (result.status == 200) {
          fetchWishList();
        }
      } catch (err) {
        console.log("Error while fetching the calatog list : ", err);
      }
    }
  };
  return (
    <div className="flex flex-row pb-10">
     
      <div className="w-[100%] overflow-y-auto" style={{ height: height }}>

          <div className="h-[20vh] pt-3 px-2 md:pt-10 md:px-[25vh] bg-gray-800 text-white">
          Home / Catalog / <span className="text-yellow-500">{location?.state?.name}</span>
          <p className="text-3xl font-bold py-3">{location?.state?.name}</p>
          <p className=" font-bold pb-3">{location?.state?.description}</p>
          </div>
        <div
          style={{ height: height }}
          className="text-white w-8/12 mx-auto py-10 flex flex-col gap-10"
        >
          {courseList.length > 0 &&
            courseList.map((val, ind) => {
              let isWishList = wishList.filter((ele) => ele._id == val._id);
              return (
                <div className="course_main">
                  {token ? (
                    isWishList.length > 0 ? (
                      <div
                        className="cor_wish cursor-pointer"
                        onClick={() => removeWishList(val)}
                      >
                        <FaHeart size={24} className="text-pink-500 hover:scale-110" />
                      </div>
                    ) : (
                      <div
                        className="cor_wish cursor-pointer"
                        onClick={() => addWishList(val)}
                      >
                        <FaHeart size={24} className="text-gray-500 hover:scale-110" />
                      </div>
                    )
                  ) : (
                    <Link to={"/login"} className="cor_wish">
                      <FaHeart size={24} className="text-pink-500" />
                    </Link>
                  )}

                  <a
                    target="_blank"
                    href={val.visitCourse}
                    className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <img
                      className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                      src={val.thumbnail}
                      alt=""
                    />

                    <div className="flex flex-col justify-between p-4 leading-normal w-[100%]">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {val.courseName} By {val.instructor.firstName} {val.instructor.lastName}
                      </h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {val.courseDescription}
                      </p>
                      <p>{val.whatYouWillLearn}</p>
                      <p className="pt-2 font-2xl text-green-300 font-bold">Rs. - {val.price}</p>
                    </div>
                  </a>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Courses;
