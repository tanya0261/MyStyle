import React from "react";
import { FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Hero({ heroData, heroCount, setHeroCount }) {
  const navigate = useNavigate();

  const isLightBanner = heroCount === 0;
  const isSecondBanner = heroCount === 1;

  return (
    <div className="absolute inset-0 flex items-center z-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

        {/* Content Container */}
        <div className="max-w-[220px] sm:max-w-md md:max-w-lg lg:max-w-xl pl-5 sm:pl-0">

          {/* Top Label */}
          <p
            className="
              uppercase
              tracking-[2px]
              sm:tracking-[6px]
              md:tracking-[8px]
              text-[10px]
              sm:text-sm
              font-medium
              text-[#6B4F46]
              mb-1
              sm:mb-3
            "
          >
            NEW SEASON
          </p>

          {/* Heading */}
          <h1
            className={`
              font-bold
              leading-[1.05]
              text-[1.9rem]
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              ${
                isLightBanner
                  ? "text-[#2F1E1A]"
                  : isSecondBanner
                  ? "text-[#3B2A22]"
                  : "text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              }
            `}
          >
            {heroData.text1}
          </h1>

          {/* Subtitle */}
          <p
            className={`
              mt-2
              sm:mt-4
              mb-5
              md:mb-10
              text-[0.95rem]
              sm:text-lg
              md:text-xl
              lg:text-2xl
              leading-relaxed
              ${
                isLightBanner
                  ? "text-[#5B463F]"
                  : isSecondBanner
                  ? "text-[#4A372F]"
                  : "text-[#4A372F]"
              }
            `}
          >
            {heroData.text2}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3 sm:gap-4 mb-5 md:mb-8">

            <button
              onClick={() => navigate("/collections")}
              className="
                bg-[#D88770]
                hover:bg-[#c8735d]
                text-white
                px-4
                py-2
                sm:px-7
                sm:py-3
                rounded-full
                text-sm
                sm:text-base
                font-semibold
                shadow-md
                hover:shadow-lg
                transition-all
                duration-300
                border-0
                outline-none
                focus:outline-none
                focus:ring-0
              "
            >
              Shop Now
            </button>

            <button
              onClick={() => {
                const productSection =
                  document.getElementById("featured-products");

                if (productSection) {
                  const y =
                    productSection.getBoundingClientRect().top +
                    window.pageYOffset -
                    80;

                  window.scrollTo({
                    top: y,
                    behavior: "smooth",
                  });
                }
              }}
              className="
                border
                border-[#D88770]
                text-[#D88770]
                hover:bg-[#D88770]
                hover:text-white
                px-4
                py-2
                sm:px-7
                sm:py-3
                rounded-full
                text-sm
                sm:text-base
                font-semibold
                transition-all
                duration-300
              "
            >
              Explore
            </button>
          </div>

          {/* Slider Dots */}
          <div className="flex gap-3">
            {[0, 1, 2, 3].map((index) => (
              <FaCircle
                key={index}
                onClick={() => setHeroCount(index)}
                size={8}
                className={`cursor-pointer transition-all duration-300 ${
                  heroCount === index
                    ? "fill-[#D88770] scale-125"
                    : isLightBanner || isSecondBanner
                    ? "fill-[#D8C7C1]"
                    : "fill-white"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Hero;