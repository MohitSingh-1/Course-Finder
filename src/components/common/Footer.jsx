import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";
import Logo from "../../assets/Logo/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm px-4 py-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
        
        {/* Logo + Social Icons */}
        <div className="flex flex-col items-center lg:items-center gap-3  ">
          <img src={Logo} alt="logo" className="h-10 object-contain" />
          <div className="flex gap-4 text-xl">
            <a href="https://www.linkedin.com/in/mohit-singh-mzp/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/_.mohit__singh._" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="https://github.com/MohitSingh-1" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaGithub />
            </a>
            <a href="mailto:the.course.finder.app@gmail.com" className="hover:text-white">
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-6 justify-center">
          <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition">Terms</Link>
          <Link to="/contact" className="hover:text-white transition">Contact</Link>
          <Link to="/about" className="hover:text-white transition">About</Link>
        </div>

        {/* Signature */}
        <div className="text-center text-xs text-gray-500">
          Made with ❤️ by Mohit Singh © 2025
        </div>
      </div>
    </footer>
  );
};

export default Footer;
