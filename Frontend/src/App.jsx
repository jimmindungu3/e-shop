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
    <div>
      <Header />
      <TopRibbon />
      <Hero />
      <TopSellers />
      <RandomProducts />
      <About />
      <Footer />
    </div>
  );
};

export default App;
