import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {} from "react-icons/fa";

const SignUp = () => {
  const navigate=useNavigate()
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);
  const [emailNotRegistered, setEmailNotRegistered] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    setPasswordsMatch(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 201) {
        navigate("confirm-email");
        // Redirect user or clear form
      } else {
        console.error("Error:", data);
        if (data.error === "User with that email already exists")
          setEmailNotRegistered(false);
        // alert(data.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Network error, please try again.");
    }
  };

  return (
    <section className="pt-2 md:pt-12 flex items-center justify-center">
      <div className="w-full bg-white rounded-lg shadow-md sm:max-w-md p-6 border">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white text-cente">
          Create Account
        </h1>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Doe"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="john@example.com"
              required
            />
          </div>
          {emailNotRegistered ? (
            <></>
          ) : (
            <div className="text-brandOrange">
              User with that email already exists!
            </div>
          )}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0712345678"
              required
            />
          </div>
          {/* Password Field */}
          <div className="relative">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <div className="relative">
              <input
                type={hidePassword ? "password" : "text"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setHidePassword(!hidePassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {hidePassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={hidePassword ? "password" : "text"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setHidePassword(!hidePassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {hidePassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          {passwordsMatch ? (
            <div className="display-none"></div>
          ) : (
            <div className="text-brandOrange">Passwords don't match</div>
          )}
          <button
            type="submit"
            className="w-full text-white bg-brandOrange hover:bg-orange-600 focus:ring-2 focus:outline-none font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
