import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPasswordResetToken } from '../services/operations/authAPI';

const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const {loading} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));
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
                            {
                                !emailSent? "Reset Your Password" : "Check Your Email"
                            }
                        </h2>
                        <p className="pb-4 text-gray-500">
                            {
                                !emailSent ? 
                                    "Forgot your password? No worries. Enter your email and we'll send you a link to reset it."
                                 : `Password reset link successfully sent. We have sent the reset email to ${email}`
                            }
                        </p>
                        <form onSubmit={submitHandler}>
                            {
                                !emailSent && (
                                    <label htmlFor="">
                                        <p>Email Address<sup className="text-pink-500">*</sup></p>
                                        <input 
                                        type="emial" 
                                        required
                                        name="email"
                                        onChange={(e)=>(
                                            setEmail(e.target.value)
                                        )}
                                        placeholder="abcd@gmail.com"
                                        className="w-full rounded-md bg-gray-600 text-white px-3 py-2 outline-0"
                                        />
                                    </label>
                                )
                            }
                            <button tupe="submit" className="mt-6 rounded-[8px] bg-yellow-500 py-[8px] w-full cursor-pointer font-medium text-gray-900 ">
                                {
                                    !emailSent ? "Reset Password" : "Resend Email"
                                }
                            </button>
                        </form>
                        <div>
                            <Link to="/login" className="flex flex-row items-center gap-2 pt-3">
                                <FaArrowLeftLong/>
                                <p>Back to Login</p>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword
