import React, { useContext, useState, useEffect } from "react";
import { FaLock, FaCreditCard, FaMobile } from "react-icons/fa";
import { CartContext } from "../App";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import About from "../components/About";

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [shippingFee, setShippingFee] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    mpesaNumber: "",
  });

  // Cities in Kenya with their shipping fees
  const kenyanCities = [
    { name: "Nairobi", fee: 200 },
    { name: "Mombasa", fee: 350 },
    { name: "Kisumu", fee: 300 },
    { name: "Nakuru", fee: 250 },
    { name: "Eldoret", fee: 300 },
    { name: "Thika", fee: 220 },
    { name: "Malindi", fee: 380 },
    { name: "Kitale", fee: 320 },
    { name: "Garissa", fee: 400 },
    { name: "Kakamega", fee: 320 },
    { name: "Nyeri", fee: 250 },
    { name: "Machakos", fee: 240 },
    { name: "Kisii", fee: 350 },
    { name: "Kericho", fee: 280 },
    { name: "Embu", fee: 280 },
  ];

  // Calculate subtotal
  const getSubtotal = () =>
    cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  // Calculate shipping based on city or 2% of goods value (whichever is higher)
  useEffect(() => {
    if (formData.city) {
      const selectedCity = kenyanCities.find(
        (city) => city.name === formData.city
      );
      const baseFee = selectedCity ? selectedCity.fee : 200;
      const percentageFee = getSubtotal() * 0.01; // 1% of total goods worth
      setShippingFee(Math.max(baseFee, percentageFee));
    }
  }, [formData.city, cart]);

  // Calculate total price including shipping
  const getTotalPrice = () => getSubtotal() + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Payment processing logic would go here
    console.log("Processing payment:", paymentMethod, formData);
    // Redirect to success page or show confirmation
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-4 my-8 border shadow-sm rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h2>
        <p className="text-gray-600">
          Your cart is empty. Add items before checkout.
        </p>
        <Link to={"/"}>
          <button className="mt-4 px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition">
            Back To Shop
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 my-8 border shadow-sm rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h2>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Main Column: Form */}
          <div className="md:col-span-4">
            <form id="checkoutForm" onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b">
                  Shipping Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                </div>

                <div className="mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City/Town
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 appearance-none"
                    >
                      <option value="">Select City/Town</option>
                      {kenyanCities.map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b">
                  Select a payment method
                </h3>
                <div className="flex gap-4 mb-4">
                <button
                    type="button"
                    onClick={() => setPaymentMethod("mpesa")}
                    className={`flex-1 py-3 px-4 rounded-lg border ${
                      paymentMethod === "mpesa"
                        ? "border-green-400 bg-green-200"
                        : "border-gray-300"
                    } flex items-center justify-center gap-2 hover:bg-green-100  transition`}
                  >
                    <FaMobile className="text-gray-700" />
                    <span className="font-medium">M-Pesa</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex-1 py-3 px-4 rounded-lg border ${
                      paymentMethod === "card"
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-300"
                    } flex items-center justify-center gap-2 hover:bg-orange-50 transition`}
                  >
                    <FaCreditCard className="text-gray-700" />
                    <span className="font-medium">Credit/Debit Card</span>
                  </button>
                  
                </div>

                {/* Card Payment Form */}
                {paymentMethod === "card" && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        required={paymentMethod === "card"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          required={paymentMethod === "card"}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          name="cardCVC"
                          value={formData.cardCVC}
                          onChange={handleInputChange}
                          placeholder="123"
                          required={paymentMethod === "card"}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* M-Pesa Form */}
                {paymentMethod === "mpesa" && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        M-Pesa Phone Number
                      </label>
                      <input
                        type="text"
                        name="mpesaNumber"
                        value={formData.mpesaNumber}
                        onChange={handleInputChange}
                        placeholder="07XX XXX XXX"
                        required={paymentMethod === "mpesa"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <p className="mt-2 text-sm text-gray-600">
                        You will receive an STK push to complete payment once
                        you place your order.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-2">
            <div className="border p-4 rounded-lg h-fit sticky top-4 md:top-16">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h3>

              {/* Items Summary */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Items In Cart: {cart.length}</span>
                  <span>KSh {getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Shipping Fee:</span>
                  <span>Ksh. {shippingFee}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                  <span>Total:</span>
                  <span className="text-orange-600">KSh {shippingFee}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-4 max-h-40 overflow-y-auto">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Your cart Items:
                </h4>
                {cart.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex gap-2 py-2 border-b"
                  >
                    <img
                      src={item.product?.images?.[0] || item.product.image}
                      alt={item.product.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-800">
                        {item.product.title}
                      </p>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Qty: {item.quantity}</span>
                        <span>
                          KSh{" "}
                          {(
                            item.product.price * item.quantity
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout Button */}
              <button
                type="submit"
                form="checkoutForm"
                className="w-full bg-orange-500 text-white py-3 font-semibold rounded-lg hover:bg-orange-600 transition flex items-center justify-center gap-2"
              >
                <FaLock size={14} />
                Pay KSh{" "}
                {(getTotalPrice() + shippingFee).toLocaleString()}
              </button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                By placing your order, you agree to our Terms of Service and
                Privacy Policy
              </div>
            </div>
          </div>
        </div>
      </div>
      <About />
      <Footer />
    </>
  );
};

export default Checkout;
