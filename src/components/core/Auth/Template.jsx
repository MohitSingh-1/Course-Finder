import { FcGoogle } from "react-icons/fc"
import { useSelector } from "react-redux"

import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import HighLightText from "../ShortHands/HighLightText"
import SignupForm from "./SignupForm"



function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center md:px-20 my-20 md:my-0">
      {loading ? (
        <div className="spinner text-center top-[48%]">
          Loading...
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-maxContent flex-col-reverse justify-between gap-y-12 p-2 md:py-12 md:px-40 md:pr-20 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto  w-full md:w-11/12 max-w-[450px] md:mx-0 ">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-white">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-gray-100">{description1}</span>{" "}
              <HighLightText text={description2}/>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>

           {/* right side's image */}
          <div className="hidden md:block  relative mx-[30%] w-11/12 max-w-[500px] md:mx-0">
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
            />
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-4 right-4 z-10"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template

