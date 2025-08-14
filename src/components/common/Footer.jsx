import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";
import Logo from "../../assets/Logo/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm px-4 py-6">
      <div className="max-w-7xl mx-20  flex flex-col lg:flex-row justify-between items-center gap-6">
        
        {/* Logo + Social Icons */}
        <div className="flex w-1/3 flex-col items-center lg:items-center gap-1  ">
          <img src={Logo} alt="logo" className="h-10 object-contain" />

          <div className="text-gray-400 text-center">
            Empowering learners to discover the best courses.
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-6 justify-center w-1/3">
          <Link to="/privacy-policy" className="hover:text-purple-400 transition">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-purple-400 transition">Terms</Link>
          <Link to="/contact" className="hover:text-purple-400 transition">Contact</Link>
          <Link to="/about" className="hover:text-purple-400 transition">About</Link>
        </div>

        <div>
          <p className="text-lg pb-2 text-gray-400 hover:underline">Follow Us</p>
          <div className="flex gap-4 text-2xl">
            <a href="https://www.linkedin.com/in/mohit-singh-mzp/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/_.mohit__singh._" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400">
              <FaInstagram />
            </a>
            <a href="https://github.com/MohitSingh-1" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400">
              <FaGithub />
            </a>
            <a href="mailto:the.course.finder.app@gmail.com" className="hover:text-purple-400">
              <FaEnvelope />
            </a>
          </div>
        </div>

      </div>
      <hr className="text-gray-800 m-8"/>
      <div>
        {/* Signature */}
        <div className="text-center text-[14px] text-gray-500 pb-4">
          © 2025 CourseFinder. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
