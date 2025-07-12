import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { FaArrowLeftLong } from 'react-icons/fa6';
import { resetPassword } from '../services/operations/authAPI';



const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const {loading} = useSelector((state)=>state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:"",
    })

    const handleOnChange = (e)=>{
        e.preventDefault();
        setFormData((prev) =>({
            ...prev,
            [e.target.name] : e.target.value,
        }))
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        console.log(token);
        dispatch(resetPassword(formData.password, formData.confirmPassword, token));
        navigate("/login");
    }

  return (
    <div className="text-white">
        {
            loading ? (
                <div>
                    Loading...
                </div>
            ) : (
                <div className="text-white md:p-[20vh] pt-20 px-10 lg:px-[35%] md:px-[25%]">
                    <h1 className="text-3xl pb-4 text-gray-300">Choose new Password</h1>
                    <p className="pb-4 text-gray-500">Almost done. Enter your new password and you're all set.</p>

                    <form onSubmit={submitHandler}>
                        <label className="w-full">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white ">
                                Password<sup className="text-pink-500">*</sup>
                            </p> 
                            <input 
                                required
                                type={showPassword ? "text":"password"} 
                                name="password"
                                value={formData.password}
                                onChange={handleOnChange}
                                placeholder="Enter Password"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-md bg-gray-600 text-white px-3 py-2 outline-0"
                            />
                            <div className="relative flex justify-end bottom-[32px]  ">
                                <div onClick={()=>setShowPassword((prev) => !prev)}
                                    className=" w-fit z-[10] cursor-pointer pr-3 "
                                >
                                    {showPassword ? (
                                        <VscEyeClosed fontSize={24} fill="#AFB2BF" />
                                        ) : (
                                        <VscEye fontSize={24} fill="#AFB2BF" />
                                    )}
                                </div>
                            </div>
                        </label>
                        <label className="w-full">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white ">
                                Confirm Password<sup className="text-pink-500">*</sup>
                            </p> 
                            <input 
                                required
                                type={showConfirmPassword ? "text":"password"} 
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleOnChange}
                                placeholder="Enter Password"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-md bg-gray-600 text-white px-3 py-2 outline-0"
                            />
                            <div className="relative flex justify-end bottom-[32px]  ">
                                <div onClick={()=>setShowConfirmPassword((prev) => !prev)}
                                    className=" w-fit z-[10] cursor-pointer pr-3 "
                                >
                                    {showConfirmPassword ? (
                                        <VscEyeClosed fontSize={24} fill="#AFB2BF" />
                                        ) : (
                                        <VscEye fontSize={24} fill="#AFB2BF" />
                                    )}
                                </div>
                            </div>
                        </label>

                        <button tupe="submit" className="mt-6 rounded-[8px] bg-yellow-500 py-[8px] w-full cursor-pointer font-medium text-gray-900 ">
                            Reset Password
                        </button>
                    </form>
                    <div>
                        <Link to="/login" className="flex flex-row items-center gap-2 pt-3">
                            <FaArrowLeftLong/>
                            <p>Back to Login</p>
                        </Link>
                    </div>
                </div>
            )
        } 
    </div>
  )
}

export default UpdatePassword
