import React from "react";
import aboutHero from "../assets/Images/aboutus1.webp";
import communityImg from "../assets/Images/aboutus2.webp";
import reviewImg from "../assets/Images/decision.jpg";
import growthImg from "../assets/Images/aboutus3.webp";
import Footer from "../components/common/Footer";

const About = () => {
  return (
    <div>
        <div className="text-white">
        {/* Hero Section */}
        <section className=" py-12 px-4 md:px-10 lg:px-20">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2 space-y-6">
                <h1 className="text-4xl font-bold leading-tight text-white">
                Empowering Learners & Educators Alike
                </h1>
                <p className="text-lg text-gray-300">
                At CourseFinder, we bridge the gap between aspiring learners and passionate educators. Whether you're exploring a new skill or aiming to upskill professionally, we help you discover the best-fit course based on honest peer reviews and transparent comparisons.
                </p>
            </div>
            <div className="lg:w-1/2">
                <img
                src={aboutHero}
                alt="About CourseFinder"
                className="rounded-lg shadow-lg w-full"
                />
            </div>
            </div>
        </section>

        {/* Review and Discovery Section */}
        <section className="py-12 px-4 md:px-10 lg:px-20">
            <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
                <img src={reviewImg} alt="Review Courses" className="rounded-xl shadow-md w-full" />
            </div>
            <div className="lg:w-1/2 space-y-5">
                <h2 className="text-3xl font-semibold text-white">
                Smarter Decisions with Honest Reviews
                </h2>
                <p className="text-gray-300">
                We provide a platform where students can leave genuine feedback on the courses they take. This allows new learners to evaluate not just the content but also the teaching quality, helping them make informed choices aligned with their learning goals.
                </p>
                <p className="text-gray-300">
                Our goal is to foster a transparent learning ecosystem where trust and community experiences lead the way.
                </p>
            </div>
            </div>
        </section>

        {/* Instructor Empowerment Section */}
        <section className=" py-12 px-4 md:px-10 lg:px-20">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-5">
                <h2 className="text-3xl font-semibold text-white">
                Helping Great Instructors Get Discovered
                </h2>
                <p className="text-gray-300">
                Not all popular courses guarantee quality teaching. That's why CourseFinder provides a space for smaller or lesser-known instructors to rise based on the merit of their content, clarity, and student satisfaction.
                </p>
                <p className="text-gray-300">
                We celebrate and support educators who prioritize student understanding and deliver value — no matter their following.
                </p>
            </div>
            <div className="lg:w-1/2">
                <img
                src={growthImg}
                alt="Grow as an Instructor"
                className="rounded-xl shadow-md w-full"
                />
            </div>
            </div>
        </section>

        {/* Community Section */}
        <section className=" py-12 px-4 md:px-10 lg:px-20 ">
            <div className="max-w-6xl mx-auto text-center space-y-6 ">
            <img
                src={communityImg}
                alt="Community Learning"
                className="mx-auto rounded-lg shadow-md w-xl "
            />
            <h2 className="text-3xl font-semibold text-white">
                Built on Community, Driven by Purpose
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
                CourseFinder thrives on student experiences and educator excellence. We envision a learning community where knowledge flows freely, choices are backed by transparency, and every voice contributes to the betterment of learning journeys.
            </p>
            </div>
        </section>
        </div>
    </div>
  );
};

export default About;
