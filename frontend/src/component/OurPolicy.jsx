import React from "react";
import {
  FaShippingFast,
  FaUndoAlt,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";

function OurPolicy() {
  const policies = [
    {
      icon: <FaShippingFast />,
      title: "Free Shipping",
      description: "Free delivery on all orders across India.",
    },
    {
      icon: <FaUndoAlt />,
      title: "Easy Returns",
      description: "7-day hassle-free returns & exchanges.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payments",
      description: "100% safe & encrypted checkout process.",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      description: "Our fashion experts are always available.",
    },
  ];

  return (
    <section className="relative py-10 md:py-14 bg-gradient-to-b from-[#FDFBF9] to-[#F8F4F1] overflow-hidden">

  {/* Background Decoration */}
  <div className="absolute top-0 left-0 w-48 md:w-72 h-48 md:h-72 bg-[#D88770]/10 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 right-0 w-48 md:w-72 h-48 md:h-72 bg-[#D88770]/10 rounded-full blur-3xl"></div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6">

    {/* Heading */}
    <div className="text-center mb-10 md:mb-14">
      <p className="uppercase tracking-[3px] md:tracking-[6px] text-[#D88770] text-[11px] md:text-sm font-medium mb-2">
        WHY CHOOSE US
      </p>

      <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#2F1E1A]">
        Premium Shopping Experience
      </h2>

      <div className="w-20 md:w-28 h-1 bg-[#D88770] mx-auto mt-4 rounded-full"></div>

      <p className="mt-4 md:mt-6 text-gray-500 max-w-2xl mx-auto text-sm md:text-lg px-4">
        We believe fashion should be effortless, luxurious and reliable.
        Enjoy premium service from browsing to delivery.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

      {policies.map((item, index) => (
        <div
          key={index}
          className="
            group
            bg-white
            rounded-2xl
            md:rounded-[30px]
            p-4
            md:p-8
            text-center
            shadow-[0_8px_30px_rgba(0,0,0,0.05)]
            hover:-translate-y-2
            hover:shadow-[0_20px_60px_rgba(216,135,112,0.15)]
            transition-all
            duration-500
          "
        >

          {/* Icon */}
          <div
            className="
              w-12
              h-12
              md:w-20
              md:h-20
              mx-auto
              mb-3
              md:mb-6
              rounded-full
              bg-[#D88770]
              flex
              items-center
              justify-center
              text-white
              text-lg
              md:text-3xl
              group-hover:scale-110
              transition-all
              duration-300
            "
          >
            {item.icon}
          </div>

          <h3 className="text-sm md:text-2xl font-semibold text-[#2F1E1A] mb-2 md:mb-3">
            {item.title}
          </h3>

          <p className="text-[11px] md:text-base text-gray-500 leading-relaxed">
            {item.description}
          </p>

        </div>
      ))}

    </div>

  </div>
</section>
  );
}

export default OurPolicy;