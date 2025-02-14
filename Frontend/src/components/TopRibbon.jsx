import React from "react";
import { FaBars, FaUser, FaShoppingCart } from "react-icons/fa";

const TopRibbon = () => {
  return (
    <div className="bg-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-3">
        {/* Left: Categories */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaBars className="text-xl" />
          <span className="font-medium">Categories</span>
        </div>

        {/* Middle: Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            className="p-2 w-full outline-none"
          />
          <button className="bg-gray-500 text-white px-4 py-2">Search</button>
        </div>

        {/* Right: Account & Cart */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 cursor-pointer">
            <FaUser className="text-xl" />
            <span className="font-medium">Account</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <FaShoppingCart className="text-xl" />
            <span className="font-medium">Cart</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRibbon;
