import React from "react";
import { FaBars, FaUser, FaShoppingCart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const TopRibbon = () => {
  return (
    <div className="bg-gray-200 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-3">
        {/* Left: Categories */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaBars className="text-xl" />
          <span className="hidden sm:inline font-medium">Categories</span>
        </div>

        {/* Middle: Search Bar */}
        <div className="flex items-center border border-gray-400 rounded-lg overflow-hidden h-10 w-full mx-4 lg:max-w-2xl">
          <input
            type="text"
            placeholder="Search Products Here"
            className="px-3 w-full outline-none h-full"
          />
          <button className="text-gray-600 bg-white px-4 h-full flex items-center justify-center">
            <IoSearch />
          </button>
        </div>

        {/* Right: Account & Cart */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 cursor-pointer">
            <FaUser className="text-xl" />
            <span className="hidden sm:inline font-medium">Account</span>
          </div>
          <div className="relative flex items-center space-x-2 cursor-pointer">
            <FaShoppingCart className="text-xl" />
            <span className="hidden sm:inline font-medium">Cart</span>
            {/* Cart Counter Placeholder */}
            <span className="absolute -top-2 -right-5 bg-brandOrange text-white text-xs font-bold px-2 py-0.5 rounded-full">
              0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRibbon;
