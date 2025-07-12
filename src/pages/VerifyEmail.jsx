import React, { useEffect } from 'react'
import { FaArrowLeftLong, FaClockRotateLeft } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import OtpInput from 'react-otp-input';
import { sendOtp } from '../services/operations/authAPI';
import { signUp } from '../services/operations/authAPI';

const VerifyEmail = () => {
    const {signupData, loading} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');

    useEffect(()=>{
        if(!signupData){
            navigate("/signup");
        }
    },[])
    const submitHandler = (e)=>{
        e.preventDefault();

        const {
            accountType, 
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;
        
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate))
    }
    const resendOtpHandler = (e)=>{
        dispatch(sendOtp(email, navigate));
    }
   return (
    <div className="text-white md:p-[20vh] pt-20 px-10 lg:px-[35%] md:px-[25%]">
        {
            loading ? (
                <div>Loading...</div>
            ): (
                <div >
                    <div className=" flex flex-col">
                        <h2 className=" text-3xl pb-4 text-gray-300">
                            Enter Verification Code
                        </h2>
                        <p className="pb-4 text-gray-500">
                            A verification code has been successfully sent to you email id. Enter the code below
                        </p>
                        <form onSubmit={submitHandler} className=" flex flex-col justify-center items-center ">
                             <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input 
                                    {...props} 
                                    placeholder="-"
                                    className="rounded text-white outline-none bg-gray-700 mx-3 py-1 focus:ring-2 focus:border-yellow-300"
                                />}
                            />

                            <button tupe="submit" className="mt-6 rounded-[8px] bg-yellow-500 py-[8px] w-full cursor-pointer font-medium text-gray-900 mb-4">
                                Verify Email
                            </button>
                        </form>
                        <div className="flex flex-row justify-between items-center ">
                            <Link to="/login" className=" flex flex-row items-center gap-2 pt-3">
                                <FaArrowLeftLong/>
                                <p>Back to Login</p>
                            </Link>
                            <button 
                            className="cursor-pointer flex flex-row gap-2 items-center pt-3"
                            onClick={resendOtpHandler}
                            >
                                <FaClockRotateLeft />
                                Resend
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail