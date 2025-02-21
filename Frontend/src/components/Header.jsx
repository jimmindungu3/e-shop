import React from "react";
import { GiCircuitry } from "react-icons/gi";
import { MdPhoneAndroid } from "react-icons/md";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="max-w-7xl mx-auto flex justify-between items-center py-4">
      <Link to={"/"} className="text-3xl flex items-center space-x-2 text-brandOrange">
        <GiCircuitry />
        <span>
          <span className="font-bold">XIR</span>ION
        </span>
      </Link>
      <div className="flex items-center space-x-4">
        <MdPhoneAndroid className="text-2xl text-gray-600" />
        <div className="flex flex-col text-right font-semibold">
          <span className="text-green-600">+254 717 055 495</span>
          <span className="text-red-600">+254 789 335 955</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
