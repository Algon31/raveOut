import React from "react";
import { Link } from "react-router-dom";
const web = "https://portfolio-snowy-xi-14.vercel.app/"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">RaveOut</h2>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} RaveOut. All rights reserved.</p>
        </div>

        <div className="flex space-x-4 text-sm">
          <Link to={web} className="hover:text-pink-500">About</Link>
          <Link to={web} className="hover:text-pink-500">Contact</Link>
          <Link to={web} className="hover:text-pink-500">Privacy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
