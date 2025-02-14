import React from "react";
import logo from "/src/assets/e-shop.jpeg";
import { FaRegHeart } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";

const Header = () => {
  return (
    <header className="max-w-7xl mx-auto flex justify-between items-center p-4">
      <div>
        <img src={logo} alt="Logo" className="h-12 rounded-lg" />
      </div>
      <div className="flex items-center space-x-4">
        {/* Icons */}
        <div className="flex items-center space-x-2">
          <FaRegHeart className="text-xl" />
          <MdBarChart className="text-xl" />
        </div>
        {/* Phone Numbers */}
        <div className="flex flex-col text-right">
          <span>+123 456 7890</span>
          <span>+098 765 4321</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
