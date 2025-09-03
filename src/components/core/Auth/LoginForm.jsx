import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import {Link, useNavigate} from "react-router-dom"
import CTAButton from "../ShortHands/Button"
import { useDispatch } from "react-redux"
import { login } from '../../../services/operations/authAPI'
import { toast } from 'react-toastify'

const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    
    const handleOnSubmit = (e)=>{
        e.preventDefault();
        dispatch(login(formData.email, formData.password, navigate));
    }

    const [formData, setFormData] = useState({email:"", password:""});
    function changeHandler(e){
        setFormData(prevFormData =>{
            return {
                ...prevFormData,
                [e.target.name] : e.target.value
            }
        })
    }


  return (
    <div className="bg-[#000814] p-4 ">
      <form onSubmit={handleOnSubmit}>
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


        <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">
                Password<sup className="text-pink-500">*</sup>
            </p> 
            <input 
                required
                type={showPassword ? "text":"password"} 
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
                <div onClick={()=>setShowPassword((prev) => !prev)}
                    className=" w-fit z-[10] cursor-pointer pr-3 "
                >
                    {showPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                </div>
            </div>
        </label>


        <div className=' flex flex-row justify-between '>
            <Link to="/forget-password">
                <p className=" ml-auto text-md text-blue-700 hover:underline ">
                    Forget Password
                </p>
            </Link>
            <Link to="/signup" >
                <p className=" ml-auto text-md text-blue-700 hover:underline">
                    Sign up
                </p>
            </Link>
        </div>

        <button 
            type="submit"
            className="mt-6 rounded-[8px] bg-yellow-500 py-[8px] w-full cursor-pointer font-medium text-gray-900"
        >
            Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
