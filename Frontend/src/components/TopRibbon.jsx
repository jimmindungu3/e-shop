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
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            className="p-2 w-full outline-none"
          />
          <button className="bg-gray-500 text-white px-4 py-2 rounded-sm">
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
            <span className="absolute -top-2 -right-5 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRibbon;
