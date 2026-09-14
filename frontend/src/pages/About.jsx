import React from "react";
import { useNavigate } from "react-router-dom";

import HeroAbout from "../assets/HeroAbout.png";
import OurStory1 from "../assets/OurStory1.png";

function About() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FDFBF9] overflow-x-hidden">

      {/* HERO */}
      <section className="relative h-[55vh] md:h-[75vh] overflow-hidden">
        <img
          src={HeroAbout}
          alt="My Style"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-6">

            <p className="uppercase tracking-[10px] mb-4 text-sm text-[#D8B08C]">
              MY STYLE
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
              Fashion Beyond Trends
            </h1>

            <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-xl text-gray-200 leading-relaxed">
              Discover carefully curated collections crafted to inspire
              confidence, elegance and individuality.
            </p>

          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <div>
            <img
              src={OurStory1}
              alt="Our Story"
              className="rounded-[32px] shadow-xl w-full"
            />
          </div>

          <div>

            <p className="uppercase tracking-[6px] text-[#D88770] text-sm mb-4">
              OUR STORY
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#2F1E1A] mb-8">
              Style That Speaks For You
            </h2>

            <p className="text-gray-600 leading-relaxed mb-5">
              My Style was founded with one mission — bringing premium
              fashion and luxury-inspired designs closer to everyone.
            </p>

            <p className="text-gray-600 leading-relaxed mb-5">
              From elegant apparel to timeless accessories, we carefully
              curate every piece to blend modern trends with lasting
              sophistication.
            </p>

            <p className="text-gray-600 leading-relaxed">
              We believe fashion is more than clothing — it is confidence,
              identity and self-expression.
            </p>

          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-16 md:pb-20">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">

          <div>
            <h3 className="text-4xl md:text-5xl font-bold text-[#D88770]">
              10K+
            </h3>

            <p className="text-gray-500 mt-3">
              Happy Customers
            </p>
          </div>

          <div>
            <h3 className="text-4xl md:text-5xl font-bold text-[#D88770]">
              500+
            </h3>

            <p className="text-gray-500 mt-3">
              Premium Products
            </p>
          </div>

          <div>
            <h3 className="text-4xl md:text-5xl font-bold text-[#D88770]">
              4.9★
            </h3>

            <p className="text-gray-500 mt-3">
              Customer Rating
            </p>
          </div>

        </div>

      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-[#F8F4F1] pt-0 pb-16 md:pb-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">

            <p className="uppercase tracking-[6px] text-[#D88770] text-sm mb-3">
              WHY CHOOSE US
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2F1E1A]">
              Crafted For Modern Luxury
            </h2>

            <p className="mt-6 max-w-2xl mx-auto text-gray-500">
              We focus on quality, elegance and an exceptional shopping
              experience from discovery to delivery.
            </p>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border border-[#E8DED8] rounded-[30px] overflow-hidden bg-white">

            <div className="p-8 border-b sm:border-r border-[#E8DED8]">
              <span className="text-[#D88770] text-4xl font-light">
                01
              </span>

              <h3 className="mt-6 text-xl font-semibold text-[#2F1E1A]">
                Premium Quality
              </h3>

              <p className="mt-3 text-gray-500 leading-relaxed">
                Carefully selected products crafted with exceptional
                quality and attention to detail.
              </p>
            </div>

            <div className="p-8 border-b lg:border-b-0 lg:border-r border-[#E8DED8]">
              <span className="text-[#D88770] text-4xl font-light">
                02
              </span>

              <h3 className="mt-6 text-xl font-semibold text-[#2F1E1A]">
                Fast Delivery
              </h3>

              <p className="mt-3 text-gray-500 leading-relaxed">
                Reliable nationwide shipping designed for a seamless
                shopping experience.
              </p>
            </div>

            <div className="p-8 border-b sm:border-r border-[#E8DED8]">
              <span className="text-[#D88770] text-4xl font-light">
                03
              </span>

              <h3 className="mt-6 text-xl font-semibold text-[#2F1E1A]">
                Easy Returns
              </h3>

              <p className="mt-3 text-gray-500 leading-relaxed">
                Simple and hassle-free returns because your satisfaction
                always comes first.
              </p>
            </div>

            <div className="p-8">
              <span className="text-[#D88770] text-4xl font-light">
                04
              </span>

              <h3 className="mt-6 text-xl font-semibold text-[#2F1E1A]">
                Dedicated Support
              </h3>

              <p className="mt-3 text-gray-500 leading-relaxed">
                Our team is always available to help with orders,
                products and assistance.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* OUR PROMISE */}
      <section className="pt-0 pb-16 md:pb-20 bg-[white]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">

            <p className="uppercase tracking-[6px] text-[#D88770] text-sm mb-3">
              OUR PROMISE
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2F1E1A]">
              Designed Around You
            </h2>

            <p className="max-w-2xl mx-auto mt-6 text-gray-500">
              Every decision we make is guided by quality,
              craftsmanship and customer satisfaction.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="text-center p-8 border border-[#EEE4DD] rounded-[28px]">
              <h3 className="text-2xl font-semibold text-[#2F1E1A] mb-4">
                Premium Quality
              </h3>

              <p className="text-gray-500 leading-relaxed">
                Carefully curated products crafted with exceptional
                materials and attention to detail.
              </p>
            </div>

            <div className="text-center p-8 border border-[#EEE4DD] rounded-[28px]">
              <h3 className="text-2xl font-semibold text-[#2F1E1A] mb-4">
                Timeless Design
              </h3>

              <p className="text-gray-500 leading-relaxed">
                Fashion that combines modern trends with enduring
                elegance and sophistication.
              </p>
            </div>

            <div className="text-center p-8 border border-[#EEE4DD] rounded-[28px]">
              <h3 className="text-2xl font-semibold text-[#2F1E1A] mb-4">
                Customer First
              </h3>

              <p className="text-gray-500 leading-relaxed">
                From browsing to delivery, every experience is
                designed around your satisfaction.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* FINAL CTA */}
      <section className="pt-0 pb-16 md:pb-20 bg-[#F8F4F1]">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">

          <p className="uppercase tracking-[6px] text-[#D88770] text-sm mb-4">
            Discover More
          </p>

          <h2 className="text-4xl md:text-6xl font-bold text-[#2F1E1A] leading-tight">
            Find Your Signature Style
          </h2>

          <p className="max-w-2xl mx-auto mt-6 text-gray-500 text-base md:text-lg">
            Explore collections created for confidence,
            elegance and modern luxury.
          </p>

          <button
            onClick={() => navigate("/collections")}
            className="
              mt-10
              px-8
              py-4
              bg-[#2F1E1A]
              text-white
              rounded-full
              font-medium
              hover:bg-[#D88770]
              transition-all
              duration-300
            "
          >
            Explore Collection
          </button>

        </div>

      </section>

    </div>
  );
}

export default About;