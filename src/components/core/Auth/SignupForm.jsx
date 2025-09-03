import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setSignupData } from "../../../slices/authSlice";
import { sendOtp } from "../../../services/operations/authAPI";
import { useDispatch } from "react-redux";
import { FaLongArrowAltLeft } from "react-icons/fa";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location=useLocation()
  // console.log(location.state.role)

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [formData, setFormData] = useState({
    accountType: location.state?.role?location.state.role:"Student",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });


  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    dispatch(setSignupData(formData));
    dispatch(sendOtp(formData.email, navigate));
  };

  
  function changeHandler(e) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }
  const userType=[
    {
        name:'Student'
    },
    {
        name:'Instructor'
    }
  ]
  return (
    <div className="bg-[#000814] p-4 ">
      <form onSubmit={handleOnSubmit}>
        {/* Name section  */}
        <div className="flex md:flex-row flex-col text-white md:gap-3">
          <label>
            <p>
              First Name<sup className="text-pink-500">*</sup>
            </p>
            <input
              required
              type="text"
              value={formData.firstName}
              name="firstName"
              onChange={changeHandler}
              placeholder="Enter first name"
              className="w-full rounded-md bg-gray-600 text-white px-3 py-2 outline-0  mb-5"
            />
          </label>
          <label htmlFor="">
            <p>
              Last Name<sup className="text-pink-500">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={changeHandler}
              placeholder="Enter last name"
              className="w-full rounded-md bg-gray-600 text-white px-3 py-2 outline-0  mb-5"
            />
          </label>
          
        </div>
        <label className="w-[100%]">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white ">
            Email Address<sup className="text-pink-500">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="abcd@gmail.com"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-md bg-gray-600 text-white px-3 py-2 outline-0  mb-5"
          />
        </label>

          <label className="w-[100%]">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white ">
            User Type<sup className="text-pink-500">*</sup>
          </p>
          {/* <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="abcd@gmail.com"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            /> */}
            <select value={formData.accountType}
            name="accountType"
             className="w-full rounded-md bg-gray-600 text-white px-3 py-2 outline-0  mb-5">
                {
                    userType.map((val,ind)=><option value={val.name}>{val.name}</option>)
                }
                
            </select>

            {/*  */}
        </label>

        {/* password fields  */}
        <div className="flex md:flex-row md:gap-3 flex-col">
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white ">
              Password<sup className="text-pink-500">*</sup>
            </p>
            <input
              required
              type={showPassword1 ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={changeHandler}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-md bg-gray-600 text-white px-3 py-2 outline-0"
            />
            <div className="relative flex justify-end bottom-[32px]  ">
              <div
                onClick={() => setShowPassword1((prev) => !prev)}
                className=" w-fit z-[10] cursor-pointer pr-3 "
              >
                {showPassword1 ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
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
              type={showPassword2 ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={changeHandler}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-md bg-gray-600 text-white px-3 py-2 outline-0"
            />
            <div className="relative flex justify-end bottom-[32px]  ">
              <div
                onClick={() => setShowPassword2((prev) => !prev)}
                className=" w-fit z-[10] cursor-pointer pr-3 "
              >
                {showPassword2 ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </div>
            </div>
          </label>
        </div>

      <Link to="/login">
        <div className="ml-auto w-full flex justify-end items-center gap-2 text-md text-blue-700 hover:underline">
          <FaLongArrowAltLeft />
          <span>Login</span>
        </div>
      </Link>

        <button
          type="submit"
          className="mt-4 rounded-[8px] bg-yellow-500 py-[8px] w-full cursor-pointer font-medium text-gray-900"
        >
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
