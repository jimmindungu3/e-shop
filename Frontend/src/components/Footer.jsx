import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* My Account */}
          <div>
            <h3 className="font-bold">My account</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Sign in
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Create account
                </a>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="font-bold">About Us</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Our Brands
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>

          {/* Countries */}
          <div>
            <h3 className="font-bold">Countries</h3>
            <ul className="mt-2 space-y-1">
              <li>Country 1</li>
              <li>Country 2</li>
              <li>Country 3</li>
              <li>Country 4</li>
              <li>Country 5</li>
              <li>Country 6</li>
              <li>Country 7</li>
            </ul>
          </div>

          {/* Social Links & Contact */}
          <div>
            <h3 className="font-bold">Social Links</h3>
            <div className="mt-2 flex space-x-4">
              <a href="#" className="text-blue-600 text-2xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-blue-400 text-2xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-pink-500 text-2xl">
                <FaInstagram />
              </a>
            </div>
            <h3 className="font-bold mt-4">Contact Us</h3>
            <p className="mt-2">+123-456-7890</p>
            <p>+098-765-4321</p>
            <p>123 Main Street, City, Country</p>
            <p>
              <strong>Monday - Friday:</strong> 08:00am - 6:00pm
            </p>
            <p>
              <strong>Saturdays:</strong> 9:00am - 2:00pm
            </p>
            <p>
              <strong>Sundays & Holidays:</strong> Closed
            </p>
            <p className="text-blue-400 hover:underline cursor-pointer">
              email@example.com
            </p>
            <p className="text-blue-400 hover:underline cursor-pointer">
              View on map
            </p>
          </div>
        </div>
        <p className="text-sm mt-6">&copy; 2011 - 2025 CompanyName&reg;</p>
      </div>
    </footer>
  );
};

export default Footer;
