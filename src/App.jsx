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
          <Route path="*" element={<Error/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
