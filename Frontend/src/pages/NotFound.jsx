import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-brandOrange">404</h1>
      <p className="text-gray-600 text-lg mt-2">
        Oops! The page you're looking for doesn't exist.
      </p>
      <img
        src="/images/404.svg"
        alt="Page Not Found"
        className="w-64 h-auto mt-6"
      />
      <Link
        to="/"
        className="mt-6 bg-brandOrange text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
