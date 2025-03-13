import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { createContext, useState, useEffect } from "react";

import Header from "./components/Header";
import TopRibbon from "./components/TopRibbon";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import EditAccount from "./pages/EditAccount";
import NotFound from "./pages/NotFound";
import RecoverPassword from "./pages/RecoverPassword";
import ProductPreview from "./components/ProductPreview";
import Cart from "./pages/Cart";
import ConfirmEmail from "./pages/ConfirmEmail";
import SearchOrCategory from "./components/SearchOrCategory";

// Contexts
export const SignedInStatusContext = createContext();
export const CartContext = createContext();
export const WishlistContext = createContext();

const App = () => {
  // Signed-in status
  const [signedInStatus, setSignedInStatus] = useState(
    localStorage.getItem("signedInStatus") === "true"
  );

  const handleSignedInStatus = () => {
    const newStatus = !signedInStatus;
    setSignedInStatus(newStatus);
    localStorage.setItem("signedInStatus", newStatus);
  };

  const handleSignOut = () => {
    localStorage.removeItem("signedInStatus");
    localStorage.removeItem("userFullName");
    localStorage.removeItem("xirionCart");
    localStorage.removeItem("xirionWishlist");
    setSignedInStatus(false);
    setCart([]);
    setWishlist([]);
  };

  // Cart State
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("xirionCart")) || [];
    setCart(savedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("xirionCart", JSON.stringify(updatedCart));
  };

  const addToCart = (product, quantity) => {
    const existingItem = cart.find((item) => item.product._id === product._id);
    const updatedCart = existingItem
      ? cart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      : [...cart, { product, quantity }];

    updateCart(updatedCart);
  };

  const incrementProductCount = (productId) => {
    updateCart(
      cart.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementProductCount = (productId) => {
    updateCart(
      cart
        .map((item) =>
          item.product._id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    updateCart(cart.filter((item) => item.product._id !== productId));
  };

  // Wishlist State
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("xirionWishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const updateWishlist = (updatedWishlist) => {
    setWishlist(updatedWishlist);
    localStorage.setItem("xirionWishlist", JSON.stringify(updatedWishlist));
  };

  const addToWishlist = (product) => {
    if (!wishlist.some((item) => item._id === product._id)) {
      updateWishlist([...wishlist, product]);
      console.log("Add to wishlist")
    }
  };

  const removeFromWishlist = (productId) => {
    updateWishlist(wishlist.filter((item) => item._id !== productId));
  };

  return (
    <Router>
      <Header />
      <SignedInStatusContext.Provider
        value={{ signedInStatus, handleSignedInStatus, handleSignOut }}
      >
        <CartContext.Provider
          value={{
            cart,
            addToCart,
            incrementProductCount,
            decrementProductCount,
            removeFromCart,
          }}
        >
          <WishlistContext.Provider
            value={{ wishlist, addToWishlist, removeFromWishlist }}
          >
            <TopRibbon />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product-preview" element={<ProductPreview />} />
              <Route path="/products" element={<SearchOrCategory />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/confirm-email" element={<ConfirmEmail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/recover-password" element={<RecoverPassword />} />
              <Route path="/edit-account" element={<EditAccount />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </WishlistContext.Provider>
        </CartContext.Provider>
      </SignedInStatusContext.Provider>
    </Router>
  );
};

export default App;
