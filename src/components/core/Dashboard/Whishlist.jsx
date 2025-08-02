import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { apiConnector } from "../../../services/apiConnector";
import { wishlistEndpoints } from "../../../services/apis";
import { FaHeart } from "react-icons/fa";

const Whishlist = () => {
  const [wishList, setWishList] = useState([]);
  const [height, setHeight] = useState(window.innerHeight - 46);
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
        // setCourseList(result.data.data);
      } catch (err) {
        console.log("Error while fetching the calatog list : ", err);
      }
    }
  };
  useEffect(() => {
    fetchWishList();
  }, []);

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
    <div className="flex flex-row ">
      <Sidebar />
      <div className="w-[100%] overflow-y-auto" style={{ height: height }}>
        <div
          style={{ height: height }}
          className="text-white w-8/12 mx-auto py-10 flex flex-col gap-10"
        >
          {wishList.length > 0 ? (
            wishList.map((val, ind) => {
              let isWishList = wishList.filter((ele) => ele._id == val._id);
              return (
                <div className="course_main">
                  <div className="cor_wish" onClick={() => removeWishList(val)}>
                    <FaHeart size={24} className="text-pink-500" />
                  </div>

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
                    </div>
                  </a>
                </div>
              );
            })
          ) : (
            <div className="text-white text-center relative top-20 left-20 font-bold text-3xl">
              <h1>Wishlist is Empty.</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Whishlist;
