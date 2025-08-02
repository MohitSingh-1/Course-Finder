import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaHeart, FaCog, FaSignOutAlt, FaBook, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/operations/authAPI";
import ConfirmLogout from "../../../pages/ConfirmLogout";

const Sidebar = () => {
  const [showModel, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const commonLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 text-sm font-medium 
     rounded-md transition-all duration-200 
     ${
       isActive
         ? "bg-yellow-700 text-yellow-200"
         : "text-gray-300 hover:text-white hover:bg-gray-700"
     }`;

  return (
    <div className="bg-gray-900 text-white w-full md:w-[220px] hidden md:flex md:flex-col justify-between md:h-[calc(100vh-3.5rem)] border-r border-gray-700">
      {/* Top section */}
      <div className="flex flex-col gap-4 mt-8 p-3">
        <NavLink to="/dashboard/my-profile" className={commonLinkClasses}>
          <FaUser /> My Profile
        </NavLink>

        {user?.accountType === "Instructor" && (
          <>
            <NavLink to="/dashboard/course-list" className={commonLinkClasses}>
              <FaBook /> My Courses
            </NavLink>
            <NavLink to="/dashboard/add-course" className={commonLinkClasses}>
              <FaPlus /> Add Courses
            </NavLink>
          </>
        )}

        {user?.accountType !== "Instructor" && (
          <NavLink to="/dashboard/wishlist" className={commonLinkClasses}>
            <FaHeart className="text-pink-500" /> Wishlist
          </NavLink>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-2"></div>

      {/* Bottom section */}
      <div className="flex flex-col gap-4 mt-auto p-3">
        <NavLink to="/dashboard/settings" className={commonLinkClasses}>
          <FaCog /> Settings
        </NavLink>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-300 hover:text-red-400 transition-all duration-200"
        >
          <FaSignOutAlt className="text-red-500" /> Logout
        </button>

        {showModel && (
          <ConfirmLogout
            onConfirm={handleLogout}
            onCancel={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
