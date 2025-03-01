import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Footer from "../components/Footer";
import About from "../components/About";
import WishList from "../components/WishList";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Fashion Women's Jewelry Moon Star Necklace Set - 6 Pieces",
      price: 317,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c29mYXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      title: "Fay Toilet Paper White (Unwrapped) - 10 Pack",
      price: 439,
      quantity: 4,
      image:
        "https://plus.unsplash.com/premium_photo-1670274609267-202ec99f8620?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      title: "Infinix Hot 50i, 6.7', 128GB + 4GB RAM, 5000 mAh (Dual Sim)",
      price: 12544,
      quantity: 3,
      image:
        "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D",
    },
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 my-8 border shadow-sm rounded-lg grid grid-cols-4 gap-4">
        {/* Main Column 1: Cart Items */}
        <div className="col-span-3">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-5 items-center py-3 border-b"
                >
                  {/* Image */}
                  <div className="col-span-1 flex items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </div>

                  {/* Description */}
                  <div className="col-span-2">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      KSh {item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-span-1 flex justify-center">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 bg-gray-200 rounded w-6 h-6 flex items-center justify-center"
                        aria-label="Decrease quantity"
                      >
                        <AiOutlineMinus size={14} />
                      </button>
                      <span className="w-6 text-center font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 bg-gray-200 rounded w-6 h-6 flex items-center justify-center"
                        aria-label="Increase quantity"
                      >
                        <AiOutlinePlus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800 p-1"
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

        {/* Main Column 2: Order Summary */}
        <div className="col-span-1 border p-4 rounded-lg h-fit sticky top-4">
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
          <button className="w-full bg-orange-500 text-white py-2 font-semibold rounded-lg hover:bg-orange-600">
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
