import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/verify-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Email verified successfully!");
        navigate("/sign-in"); // Redirect to login page
      } else {
        setError(data.error || "Invalid code. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center mt-12 md:mt-24">
      <div className="w-full bg-white rounded-lg shadow-md sm:max-w-md p-6 border">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl text-center">
          Confirm Your Email
        </h1>
        <p className="text-gray-600 text-sm text-center mb-4">
          Enter the code sent to your email.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Verification Code
            </label>
            <input
              type="text"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Enter code"
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full text-white bg-brandOrange hover:bg-orange-600 focus:ring-1 
            focus:outline-none font-semibold rounded-lg text-sm px-5 py-2.5"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-4">
          Didn't receive a code?{" "}
          <button
            className="text-brandOrange font-semibold hover:underline"
            onClick={() => alert("Resend code logic here")}
          >
            Resend Code
          </button>
        </p>
      </div>
    </section>
  );
};

export default ConfirmEmail;
