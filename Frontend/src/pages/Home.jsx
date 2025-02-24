import React from "react";
import Header from "../components/Header";
import TopRibbon from "../components/TopRibbon";
import TopSellers from "../components/TopSellers";
import RandomProducts from "../components/RandomProducts";
import Hero from "../components/Hero";
import About from "../components/About";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <TopRibbon />
      <Hero />
      <TopSellers />
      <RandomProducts />
      <About />
      <Footer />
    </>
  );
};

export default Home;
