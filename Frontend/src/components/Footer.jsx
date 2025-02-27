import React from "react";
import { FaFacebook, FaTiktok, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-sm py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* My Account */}
          <div>
            <h3 className="font-bold">My account</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to={"/sign-in"}>Sign In</Link>
              </li>
              <li>
                <Link to={"/sign-up"}>Create Account</Link>
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
              {/* <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li> */}
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

          {/* Social links */}
          <div>
            <h3 className="font-bold">Connect With Us</h3>
            <div className="mt-2 flex space-x-4">
              <a href="#" className="text-blue-600 text-2xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-white text-2xl">
                <FaTiktok />
              </a>
              <a href="#" className="text-pink-500 text-2xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-white text-2xl">
                <FaXTwitter />
              </a>
            </div>
          </div>

          {/* Social Links & Contact */}
          <div>
            <h3 className="font-bold">Contact Us</h3>
            <p className="mt-2">+254-717-055-495</p>
            <p>+254-789-335-955</p>
            {/* <p>123 Main Street, City, Country</p> */}
            {/* <p>
              <strong>Monday - Friday:</strong> 08:00am - 6:00pm
            </p>
            <p>
              <strong>Saturdays:</strong> 9:00am - 2:00pm
            </p>
            <p>
              <strong>Sundays & Holidays:</strong> Closed
            </p> */}
            <a
              href="mailto:email@xirionafrica.com"
              className="text-blue-400 hover:underline cursor-pointer"
            >
              email@xirionafrica.com
            </a>

            {/* <p className="text-blue-400 hover:underline cursor-pointer">
              View on map
            </p> */}
          </div>
        </div>
        <p className="text-sm mt-6">&copy; 2011 - 2025 Xirion Africa&reg;</p>
      </div>
    </footer>
  );
};

export default Footer;
