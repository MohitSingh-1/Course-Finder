import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaUser, FaCog, FaSignOutAlt, FaBook, FaPlus } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";

import logo from "../../assets/Logo/logo.png";
import { NavbarLinks } from "../../data/navbar-links";
import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { logout } from "../../services/operations/authAPI";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state?.profile);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const [subLinks, setSubLinks] = useState([]);

  const ref = useRef(null);

  useEffect(() => {
    const fetchSublinks = async () => {
      try {
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(result.data.allCategory);
      } catch (err) {
        console.log("Error while fetching catalog list:", err);
      }
    };

    fetchSublinks();

    setTimeout(() => {
      if (!JSON.parse(localStorage.getItem("user"))) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }, 1000);

    dispatch(
      setToken(
        localStorage.getItem("token")
          ? JSON.parse(localStorage.getItem("token"))
          : null
      )
    );

    dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
  }, []);


  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const catalogHandler = (e) => {
    setShowCatalog(!showCatalog);
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-purple-400 font-bold underline decoration-[1px]"
      : "text-white hover:text-blue-400 transition-all duration-150 cursor-pointer";

  return (
    <div className="flex h-16 items-center border-b-[1px] justify-evenly bg-gray-900 border-gray-600">
      <div className="flex w-full  md:max-w-[1340px] pr-4 items-center justify-between ">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="w-[200px] md:w-[230px]" />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Navigation Menu */}
        <nav
          className={`md:static z-10000  md:w-auto w-[40%] absolute top-[6.7vh] right-8 bg-gray-800 md:bg-transparent transition-all duration-300 ease-in-out  ${
            isMenuOpen ? "block" : "hidden"
          } md:block`}
        >
          <ul className="flex md:flex-row flex-col text-end gap-6 md:gap-10 md:p-0 p-4 items-center justify-center">
            {/* Top nav links */}
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className="relative text-white hover:text-blue-400 cursor-pointer flex items-center gap-1"
                    onClick={catalogHandler}
                  >
                    Catalog <IoIosArrowDown />
                    {showCatalog && (
                      <div className="absolute right-0 md:left-0 md:right-auto top-full md:mt-2 w-[40vw] md:w-[200px] bg-gray-700 text-white shadow-md rounded-md transition-opacity duration-200 z-50">
                        <ul className="flex flex-col">
                          {subLinks.length > 0 ? (
                              user ? subLinks.map((ele) => (
                                <li key={ele._id}>
                                  <Link
                                    to={`/catalog/${ele.name}`}
                                    state={{ id: ele._id, name:ele.name,description:ele.description }}
                                    className="block px-4 py-2 hover:bg-gray-600 hover:text-blue-400 transition-all duration-150 text-sm text-gray-300"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                  >
                                    {ele.name}
                                  </Link>
                                </li>
                              )) : (
                                <Link to="/login" className="px-4 py-3 text-sm text-white">
                                  Login first...
                                </Link>
                              )
                          ) : (
                            <li className="px-4 py-3 text-sm text-gray-400">
                              Loading...
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink to={link.path} className={navLinkClass} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {link.title}
                  </NavLink>
                )}
              </li>
            ))}

            {/* Mobile view dashboard links */}
            {user && (
              <>
                <NavLink to="/dashboard/my-profile" className="text-white md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  <FaUser className="inline mr-1" /> My Profile
                </NavLink>
                {user.accountType === "Instructor" ? (
                  <>
                    <NavLink to="/dashboard/course-list" className="text-white md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                      <FaBook className="inline mr-1" /> My Courses
                    </NavLink>
                    <NavLink to="/dashboard/add-course" className="text-white md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                      <FaPlus className="inline mr-1" /> Add Course
                    </NavLink>
                  </>
                ) : (
                  <NavLink to="/dashboard/wishlist" className="text-white md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <FaHeart className="inline text-pink-500 mr-1" /> Wishlist
                  </NavLink>
                )}
                <NavLink to="/dashboard/settings" className="text-white md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  <FaCog className="inline mr-1" /> Settings
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-white md:hidden"
                >
                  <FaSignOutAlt className="inline mr-1" /> Logout
                </button>
              </>
            )}

            {/* Auth Links for mobile */}
            {!user && (
              <>
                <NavLink to="/login" className="text-white md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  LogIn
                </NavLink>
                <NavLink to="/signup" className="text-white md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  SignUp
                </NavLink>
              </>
            )}
          </ul>
        </nav>

        {/* Desktop Right Side Icons */}
        <div className="md:flex items-center gap-x-3 hidden text-white">
          
          {!token && (
            <>
              <Link to="/login">
                <button className="px-5 py-1 rounded-full border border-gray-400 text-gray-200 cursor-pointer hover:bg-cyan-400 hover:text-black transition-all duration-300">
                  LogIn
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-5 py-1 rounded-full border border-gray-400 text-gray-200 cursor-pointer hover:bg-pink-500 hover:text-white transition-all duration-300">
                  Register with us
                </button>
              </Link>
            </>
          )}
          {token && <div ref={ref}><ProfileDropDown /></div>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
