import React, {useRef, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoCartOutline } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';

import logo from '../../assets/Logo/logo.png';
import { NavbarLinks } from '../../data/navbar-links';

import ProfileDropDown from '../core/Auth/ProfileDropDown';

import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import useOnClickOutside from "../../hooks/useOnClickOutside"

const Navbar = () => {
    
    const ref = useRef(null);
    useOnClickOutside(ref, () => setShowCatalog(false))
    const {token} = useSelector( (state) => state.auth );
    const {user} = useSelector((state)=> state.profile);
    const {totalItem} = useSelector( (state) => state.cart );
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showCatalog, setShowCatalog] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [subLinks, setSubLinks] = useState([]);

    const fetchSublinks = async()=>{
            try{
                const result = await apiConnector("GET", categories.CATEGORIES_API);
                setSubLinks(result.data.allCategory);
            }catch(err){
                console.log("Error while fetching the calatog list : ",err);
            }
        }
        
    useEffect(()=>{
        fetchSublinks();
    },[])

    const oneTimeClick = ()=>{
        setIsMenuOpen(!isMenuOpen);
    }

 

    const catalogHandler = (e)=>{
        e.stopPropagation();   
        setShowCatalog(!showCatalog);
    }

  return (
    <div className="flex h-[6.7vh] items-center border-b-[1px] justify-evenly bg-gray-900 border-gray-600">
      <div className="flex w-full md:max-w-[1200px] pr-4 items-center justify-between ">

        {/* logo  */}
        <Link to="/">
            <img src={logo} alt="logo" className="w-[200px] md:w-[230px] bg-blend-color "/>
        </Link>

        <button className="text-white md:hidden text-2xl"
        onClick={(e)=>{
            setIsMenuOpen(!isMenuOpen)
        }}
        >
            ☰
        </button>

        {/* nav bars  */}
        <nav className={`md:static absolute top-[6.7vh] left-0 w-full bg-gray-800 md:bg-transparent transition-all duration-300 ease-in-out z-50 ${isMenuOpen ? "block" : "hidden"} md:block`}>
            <ul className="flex md:flex-row flex-col text-end gap-6 md:gap-10 md:p-0 p-4 items-center justify-center ">
                {
                    NavbarLinks.map((link, index)=>(
                        <li key={index}>
                            {
                                link.title === "Catalog" ? (
                                    <div 
                                        className="relative text-white hover:text-blue-400 transition-all duration-150 cursor-pointer flex flex-row items-center gap-1"
                                        onClick={catalogHandler}
                                        ref={ref}
                                    >
                                        Catalog {<IoIosArrowDown />}

                                        {/* dropdown  render only when showCatalog === true*/}
                                        {
                                            showCatalog && (
                                                <div className="absolute left-[10vw] md:left-0 top-full md:mt-2 w-[40vw] md:w-[200px] bg-gray-700 text-white shadow-md rounded-md transition-opacity duration-200 z-50">
                                                    <ul className="flex flex-col">
                                                        {subLinks.length > 0?(
                                                            subLinks.map((ele, index)=>(
                                                                <li key={index}> 
                                                                    <Link to={`/catalog/${ele.name}`} className="text-start block px-4 py-2 hover:bg-gray-600 hover:text-blue-400 hover:rounded-lg transition-all duration-150 text-sm text-gray-300">
                                                                        {ele.name}
                                                                    </Link>
                                                                </li>
                                                            ))
                                                        ):(
                                                            <li className="px-4 py-3 text-sm text-gray-400">
                                                                Loading...
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            )
                                        }
                                        
                                    </div>
                                ):(
                                    <NavLink 
                                        to={link?.path}
                                        className={({isActive})=>
                                            isActive ?
                                            "text-purple-400 font-bold underline decoration-[1px]" :
                                            "text-white hover:text-blue-400 transition-all duration-150 cursor-pointer"
                                        }
                                        onClick={oneTimeClick}
                                    >
                                        <p >
                                            {link.title}
                                        </p>
                                    </NavLink>
                                )
                            }
                        </li>
                    ))
                }
                <NavLink 
                    to="/login" 
                    className={`text-white  md:hidden`} 
                    onClick={oneTimeClick}
                >
                    LogIn
                </NavLink>
                <NavLink 
                    to="/signup" 
                    className={`text-white md:hidden`} 
                    onClick={oneTimeClick}
                >
                    SignUp
                </NavLink>
            </ul>
        </nav>

        {/* login/signup/dashboard  */}
        <div className={`md:flex items-center gap-x-3 hidden text-white`}>
                {
                    user && user?.accountType != "Instructor" && (
                        <Link to="/dashboard/cart" className="relative">
                            <IoCartOutline />
                            {
                                totalItem > 0 && (
                                    <span>
                                        {totalItem}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/login">
                            <button className="text-gray-400 border border-gray-500 py-1 px-2 rounded-lg cursor-pointer transition-all duration-300 hover:text-white">
                                LogIn
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/Signup">
                            <button className="text-gray-400 border border-gray-500 py-1 px-2 rounded-lg cursor-pointer transition-all duration-300 hover:text-white">
                                SignUp
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null 
                    && <ProfileDropDown/>
                }

        </div>



      </div>
    </div>
  )
}

export default Navbar
