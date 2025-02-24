import React, { useState } from "react";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password recovery for:", email);
    // Add API call logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Recover Password
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Enter your email, and we'll send you a reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brandOrange"
            required
          />
          <button
            type="submit"
            className="w-full bg-brandOrange text-white py-2 px-4 rounded hover:bg-brandOrangeDark transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
