import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchProducts from "../components/SearchProducts";
import FeaturedProducts from "../components/FeaturedProducts";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <SearchProducts />
      <FeaturedProducts />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default Home;
