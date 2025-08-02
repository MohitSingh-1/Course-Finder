import React from "react";
import { HiArrowRight } from "react-icons/hi";
import {Link} from "react-router-dom"
import HighLightText from "../components/core/HomePage/HighLightText";
import CTAButton from "../components/core/HomePage/Button"
import bannerVideo from "../assets/Images/banner.mp4"
import instructorImage from "../assets/Images/instructor2.png"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import Footer from "../components/common/Footer";


const Home = () => {


  return (
    <div className="">
      {/* Section 1  */}
      <section className="flex flex-col text-center ">
        {/* upper div button */}
        <div className="relative mx-auto flex flex-col w-11/12 items-center  text-white justify-between ">
          <Link to={"/signup"} state={{ role: "Instructor" }}>
            <div
              className="group mt-16 p-1 mx-auto rounded-full bg-gray-700 font-bold text-gray-300 
                                transition-all duration-200 hover:scale-95 w-fit"
            >
              <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-gray-800 ">
                <p>Become an Instructor</p>
                <HiArrowRight />
              </div>
            </div>
          </Link>

          <div className="text-center text-4xl font-semibold mt-7">
            Empower Your Future with
            <HighLightText text={"Coding Skills"} />
          </div>

          <div className="w-[90%] text-center text-sm font-bold text-gray-500 mt-5 max-w-[1100px]">
            Discover, compare, and review the best coding courses from top
            creators—all in one place. Whether you're a beginner exploring
            programming or a developer leveling up, CourseFinder helps you make
            smarter learning choices with honest reviews and course comparisons.
          </div>

          <div className="flex flex-row gap-[5vw] md:gap-20 mt-8">
            <CTAButton color={"yellow"} linkto={"/aboutUs"}>
              Learn More
            </CTAButton>
            <CTAButton color={"blue"} linkto={"/login"}>
              Explore courses
            </CTAButton>
          </div>

          <div className="shadow-amber-400 text-center mt-12 drop_cyan_shadow mb-20 max-w-[1250px]">
            <video
              muted
              loop
              autoPlay
              className=" inline-block drop_white_shadow"
            >
              <source src={bannerVideo} type="video/mp4" />
            </video>
          </div>

          {/* code section */}
          <div className=" mb-20 w-full max-w-[1250px] py-7 ">
            <CodeBlocks 
              position={"lg:flex-row"} 
              heading={
                <div className="text-4xl font-semibold text-start">
                  Unlock your
                  <HighLightText text={" learning journey "}/>with the best courses.
                </div>
              } 
              subheading={"Discover thousands of courses from top platforms in one place. Compare prices, content, duration, and reviews — and pick the one that suits your goals best."} 
              ctabtn1={
                {
                  text:"Discover Now",
                  color:"yellow",
                  linkto:"/login"
                }
              } 
              ctabtn2={
                {
                  text:"See Reviews",
                  color:"black",
                  linkto:"/"
                }
              } 
              code={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>My Awesome Page</title>\n</head>\n<body>\n<h1><a href="/">Welcome</a></h1>\n<a href="/home">Home</a>\n<a href="/about">About</a>\n</body>\n`}
              bgGradient={<div className="codeblock1 absolute"></div>}
              codeColor={"text-yellow-400"}
            />
          </div>

        </div>
      </section>

      {/* Section 2  */}
      {/* <section>
        <div className="h-10 w-full"></div>
      </section> */}

      {/* Section 3  */}

      {/* Section 4  */}
      <section className="relative mx-auto flex flex-col md:flex-row  items-center justify-center gap-15 md:gap-30 ">
        {/* part  - 1 */}
        <div className="md:mt-20 flex md:mb-20 mx-auto w-[50%] justify-end ">
          <img
            className="w-auto md:h-[70vh] drop_white_shadow "
            src={instructorImage}
            alt="instructor image"
          />
        </div>
        {/* part - 2  */}
        <div className="text-white md:mr-[200px] items-center text-center">
          <div className="text-5xl font-semibold mt-7 md:text-start mb-3">
            Are you <br className="hidden"/>
            an <HighLightText text={"Instructor"} />?
          </div>
          <div className="max-w-[700px] text-gray-500 mb-10">
            Register your course here to help students discover and compare the
            best learning options available. Our platform is dedicated to
            showcasing quality content — making it easier for learners to find
            the right course, faster.
          </div>
          <div className=" md:w-fit w-fit relative mb-4 left-[35vw] md:static ">
            <CTAButton color={"green"} linkto={"/signup"}>
              <div className="flex flex-row items-center gap-2 ">
                Register Course
                <HiArrowRight/>
              </div>
            </CTAButton>
          </div>
              
        </div>
        
      </section>

      {/* Reviws from Other Learner */}
      {/* <h1 className="text-center text-4xl font-semibold mt-8 text-white mb-20">
        Reviews from other learners
      </h1> */}


      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Home;
