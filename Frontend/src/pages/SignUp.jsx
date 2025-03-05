import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);
  const [emailNotRegistered, setEmailNotRegistered] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);

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
        localStorage.setItem("email", formData.email);
        navigate("/confirm-email", { state: formData.email });
      } else {
        console.error("Error:", data);
        if (data.error === "User with that email already exists")
          setEmailNotRegistered(false);
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Network error, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-2 md:pt-12 flex items-center justify-center">
      <div className="w-full bg-white rounded-lg shadow-md sm:max-w-md p-6 border">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl text-center">
          Create Account
        </h1>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="John"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Doe"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">
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
          {!emailNotRegistered && (
            <div className="text-red-500">
              User with that email already exists!
            </div>
          )}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="0712345678"
              required
            />
          </div>
          {/* Password Field */}
          <div className="relative">
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="relative">
              <input
                type={hidePassword ? "password" : "text"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10"
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
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <input
              type={hidePassword ? "password" : "text"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="••••••••"
              required
            />
          </div>
          {!passwordsMatch && (
            <div className="text-red-500">Passwords don't match</div>
          )}
          <button
            type="submit"
            className="w-full text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:outline-none font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-sm font-light text-gray-500 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
