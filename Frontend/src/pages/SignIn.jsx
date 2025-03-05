import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let formErrors = { email: "", password: "", general: "" };

    // Email validation
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email format is invalid";
    }

    // Password validation
    if (!formData.password) {
      formErrors.password = "Password is required";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    const formErrors = validateForm();

    // Check if there are any validation errors
    if (formErrors.email || formErrors.password) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error responses
        if (data.error === "Invalid credentials") {
          setErrors((prev) => ({
            ...prev,
            email: "No account found with this email",
          }));
        } else if (data.error === "Wrong password") {
          setErrors((prev) => ({ ...prev, password: "Incorrect password" }));
        } else {
          setErrors((prev) => ({
            ...prev,
            general: data.error || "Sign-in failed",
          }));
        }
        return;
      }

      // Successful sign-in
      navigate("/");
    } catch (err) {
      setErrors((prev) => ({ ...prev, general: err.message }));
    }
  };

  return (
    <section className="dark:bg-gray-900 pt-2 md:pt-20 flex items-center justify-center">
      <div className="w-full bg-white rounded-lg shadow-md sm:max-w-md dark:bg-gray-800 dark:border dark:border-gray-700 p-6">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>

        {errors.general && (
          <p className="text-red-500 text-sm mt-2">{errors.general}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="name@company.com"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-2 border rounded focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-500 dark:text-gray-300">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link
              to="/recover-password"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-brandOrange hover:bg-brandOrangeDark focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5"
          >
            Sign in
          </button>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don't have an account yet?{" "}
            <Link
              to="/sign-up"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
