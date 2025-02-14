import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

const About = () => {
  return (
    <div className="bg-gray-200 pb-6">
      <div className="max-w-7xl mx-auto mt-8 p-6 space-y-4">
        <h2 className="text-3xl font-bold">Why Shop With US</h2>
        <p>
          Welcome to our ecommerce platform, where quality meets affordability.
          We strive to bring you the best products at unbeatable prices.
        </p>
        <p>
          Our mission is to provide a seamless shopping experience, offering
          top-notch customer service and a curated selection of goods.
        </p>
        <p>
          Whether you're looking for the latest trends or everyday essentials,
          we've got you covered with an ever-growing inventory.
        </p>
        <p>
          We believe in sustainability and ethical sourcing, ensuring our
          products are both high-quality and responsibly made.
        </p>
        <p>
          Join our community and experience hassle-free shopping with fast
          shipping and easy returns.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold">Subscribe to Our Emails</h3>
            <p>Stay updated with the latest deals and exclusive offers.</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 mt-2 border rounded"
            />
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded">
              Subscribe
            </button>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-6">Follow Us on Socials</h3>
            <p>Connect with us for updates and exclusive content.</p>
            <div className="flex justify-center space-x-4 mt-6">
              <a href="#" className="text-blue-600 text-2xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-blue-400 text-2xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-pink-500 text-2xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-black text-2xl">
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
