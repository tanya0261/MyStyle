import React, { useEffect, useState } from "react";
import Background from "../component/Background";
import Hero from "../component/Hero";
import Product from "./Product";
import OurPolicy from "../component/OurPolicy";
import NewLetterBox from "../component/NewLetterBox";
import Footer from "../component/Footer";

function Home() {
  const heroData = [
    {
      text1: "Elegant Fashion",
      text2: "Discover Your Perfect Look",
    },
    {
      text1: "Step Into Style",
      text2: "Premium Watch Collection",
    },
    {
      text1: "New Arrivals",
      text2: "Fashion For Every Occasion",
    },
    {
      text1: "Luxury Accessories",
      text2: "Bags, Watches & More",
    },
  ];

  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prev) => (prev + 1) % heroData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F8F4F1] overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="relative">
        <Background heroCount={heroCount} />

        <Hero
          heroData={heroData[heroCount]}
          heroCount={heroCount}
          setHeroCount={setHeroCount}
        />
      </section>

      {/* FEATURED PRODUCTS */}
      <div id="featured-products" className="mb-0">
        <Product />
      </div>

      {/* OUR POLICY */}
      <OurPolicy />

      <NewLetterBox />

      <Footer />

    </div>
  );
}

export default Home;