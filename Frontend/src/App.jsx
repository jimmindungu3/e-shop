import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { createContext, useState } from "react";

import Header from "./components/Header";
import TopRibbon from "./components/TopRibbon";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import EditAccount from "./pages/EditAccount";
import NotFound from "./pages/NotFound";
import RecoverPassword from "./pages/RecoverPassword";
import ProductPreview from "./components/ProductPreview";
import Cart from "./pages/cart";
import ConfirmEmail from "./pages/ConfirmEmail";

// Context
export const SignedInStatusContext = createContext();

const App = () => {
  const [signedInStatus, setSignedInStatus] = useState(
    localStorage.getItem("signedInStatus") === "true"
  );

  const handleSignedInstatus = () => {
    const newStatus = !signedInStatus;
    setSignedInStatus(newStatus);
    localStorage.setItem("signedInStatus", newStatus);
  };

  const handleSignOut = () => {
    localStorage.removeItem("signedInStatus");
    localStorage.removeItem("userFullName");
    setSignedInStatus(false);
  };
  

  return (
    <Router>
      <Header />
      <SignedInStatusContext.Provider
        value={{ signedInStatus, handleSignedInstatus, handleSignOut }}
      >
        <TopRibbon />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-preview" element={<ProductPreview />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route path="/edit-account" element={<EditAccount />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SignedInStatusContext.Provider>
    </Router>
  );
};

export default App;
