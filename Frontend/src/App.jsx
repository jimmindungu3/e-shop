import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import Header from "./components/Header";
import TopRibbon from "./components/TopRibbon";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import EditAccount from "./pages/EditAccount";
import NotFound from "./pages/NotFound";
import RecoverPassword from "./pages/RecoverPassword";
import ProductPreview from "./components/ProductPreview";
import Cart from "./components/cart";

const App = () => {
  return (
    <Router>
      <Header />
      <TopRibbon />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-preview" element={<ProductPreview />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/edit-account" element={<EditAccount />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
