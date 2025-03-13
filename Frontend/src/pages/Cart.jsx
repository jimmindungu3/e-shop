import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Footer from "../components/Footer";
import About from "../components/About";
import WishList from "../components/WishList";
import { CartContext } from "../App";

const Cart = () => {
  const { cart, incrementProductCount, decrementProductCount, removeFromCart } =
    useContext(CartContext);

  // Calculate total cart price
  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 my-8 border shadow-sm rounded-lg grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* Main Column: Cart Items */}
        <div className="md:col-span-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Cart</h2>

          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item.product._id}
                  className="grid grid-cols-5 items-center py-3 border-b"
                >
                  {/* Image */}
                  <div className="col-span-1 flex items-center">
                    <img
                      src={item.product?.images?.[0] || item.product.image}
                      alt={item.product.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </div>

                  {/* Description */}
                  <div className="col-span-2">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {item.product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      KSh {(item.product.price).toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-span-1 flex justify-center">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => decrementProductCount(item.product._id)}
                        disabled={item.quantity <= 1}
                        className="p-1 bg-gray-200 hover:bg-gray-300 rounded w-6 h-6 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-200"
                        aria-label="Decrease quantity"
                      >
                        <AiOutlineMinus size={14} />
                      </button>
                      <span className="w-6 text-center font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => incrementProductCount(item.product._id)}
                        className="p-1 bg-gray-200 hover:bg-gray-300 rounded w-6 h-6 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-200"
                        aria-label="Increase quantity"
                      >
                        <AiOutlinePlus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="text-gray-600 hover:text-gray-700 p-1"
                      aria-label="Remove item"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="md:col-span-2 border p-4 rounded-lg h-fit sticky top-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-800">
              Subtotal:
            </span>
            <span className="text-xl font-bold text-orange-600">
              KSh {getTotalPrice().toLocaleString()}
            </span>
          </div>
          <button className="w-full bg-orange-500 text-white py-2 font-semibold rounded-lg hover:bg-orange-600 transition">
            Checkout (KSh {getTotalPrice().toLocaleString()})
          </button>
        </div>
      </div>

      <WishList />
      <About />
      <Footer />
    </>
  );
};

export default Cart;