import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaUser, FaShoppingCart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const TopRibbon = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-200 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 md:pr-6">
        {/* Left: Categories */}
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-300 px-3 py-2 rounded-md">
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
        <div className="flex items-center space-x-4 relative">
          {/* Account Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
          >
            <div
              className="flex items-center space-x-2 cursor-pointer px-3 py-2 rounded-md hover:bg-gray-300"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FaUser className="text-xl" />
              <span className="hidden sm:inline font-medium">Account</span>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-lg shadow-md overflow-hidden z-50">
                <Link to="/sign-in" className="block px-4 py-2 hover:bg-gray-100">
                  Sign In
                </Link>
                <Link to="/sign-up" className="block px-4 py-2 hover:bg-gray-100">
                  Sign Up
                </Link>
                <Link to="/edit-account" className="block px-4 py-2 hover:bg-gray-100">
                  Edit Account
                </Link>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative flex items-center space-x-2 cursor-pointer px-3 py-2 rounded-md hover:bg-gray-300">
            <FaShoppingCart className="text-xl" />
            <span className="hidden sm:inline font-medium">Cart</span>
            {/* Cart Counter */}
            <span className="absolute -top-2 -right-5 bg-brandOrange text-white text-xs font-bold px-2 py-0.5 rounded-full">
              0
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopRibbon;
