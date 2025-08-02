import { useState } from "react";
import "./index.css";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./components/core/Auth/LoginForm";
import Template from "./components/core/Auth/Template";
import Login from "./pages/Login";
import Navbar from "./components/common/Navbar";
import Signup from "./pages/Signup"
import ForgetPassword from "./pages/ForgotPassword"
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail"
import Error from "./pages/Error"
import Contact from "./pages/Contact";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile"
import Whishlist from "./components/core/Dashboard/Whishlist";
import Settings from "./components/core/Dashboard/Settings"
import CourseList from "./components/core/Dashboard/CourseList";
import AddCourses from "./components/core/Dashboard/AddCourses";
import Courses from "./components/core/Dashboard/Courses";


function App() {
  return (
    <>
      <div className="w-screen  min-h-screen bg-[#000814]  flex flex-col font-inter">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/forget-password" element={<ForgetPassword/>}/>
          <Route path="/update-password/:id" element={<UpdatePassword/>}/>
          <Route path="/verify-email" element={<VerifyEmail/>}/>
          <Route path="/contact" element={<Contact/>} />
          <Route path="/about" element={<About/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
          <Route path="/dashboard/wishlist" element={<Whishlist/>}/>
          <Route path="/dashboard/settings" element={<Settings/>}/>
          <Route path="/dashboard/course-list" element={<CourseList/>}/>
          <Route path="/dashboard/add-course" element={<AddCourses/>}/>
          <Route path="/catalog/:name" element={<Courses />}/>
          {/* /course-list  add-course*/}
          <Route path="*" element={<Error/>}/>



        </Routes>
      </div>
    </>
  );
}

export default App;
