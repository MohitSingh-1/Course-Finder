import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";
import Logo from "../../assets/Logo/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm px-4 py-8">
      <div className="max-w-7xl  mx-auto grid md:flex md:flex-row md:justify-around  gap-8 md:grid-cols-3 md:items-start md:px-8">
        
        {/* Logo + Tagline */}
        <div className="flex  flex-col items-center md:items-start text-center md:text-left">
          <img
            src={Logo}
            alt="logo"
            className="h-10 md:ml-14  object-contain"
          />
          <p className="mt-2 text-gray-400">
            Empowering learners to discover the best courses.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold mb-2 text-white md:hidden">Quick Links</h3>
          <div className="space-y-1 flex flex-col md:flex-row md:space-y-0 md:gap-6 text-center md:text-left">
            <Link to="/privacy-policy" className="hover:text-purple-400 transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-purple-400 transition">Terms</Link>
            <Link to="/contact" className="hover:text-purple-400 transition">Contact</Link>
            <Link to="/about" className="hover:text-purple-400 transition">About</Link>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold mb-2 text-white">Follow Us</h3>
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

      {/* Divider */}
      <hr className="text-gray-800 my-6" />

      {/* Bottom Bar */}
      <div className="text-center text-xs text-gray-500">
        © 2025 CourseFinder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
