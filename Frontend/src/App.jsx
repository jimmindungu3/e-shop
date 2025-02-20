import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import TopRibbon from "./components/TopRibbon";
import Hero from "./components/Hero";
import TopSellers from "./components/TopSellers";
import RandomProducts from "./components/RandomProducts";
import About from "./components/About";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Header />
      <TopRibbon />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <TopSellers />
              <RandomProducts />
              <About />
            </>
          }
        />

        {/* Other Pages */}
        {/* <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} /> */}

        {/* 404 Page */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
