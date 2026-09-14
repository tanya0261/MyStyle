import React, { useState } from "react";

function NewLetterBox() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    alert("🎉 Join us and get 15% OFF on your first order!");

    setEmail("");
  };

  return (
    <section className="py-16 px-4 bg-[#FDFBF9]">
      <div className="max-w-4xl mx-auto text-center">

        {/* Label */}
        <p className="uppercase tracking-[6px] text-[#D88770] text-xs mb-3">
          Newsletter
        </p>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-[#2F1E1A] mb-4">
          Join Our Fashion Club
        </h2>

        {/* Text */}
        <p className="text-gray-500 max-w-2xl mx-auto mb-10">
          Subscribe to receive exclusive offers, new arrivals,
          style inspiration and enjoy 15% OFF your first order.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="
            max-w-2xl
            mx-auto
            bg-white
            rounded-full
            p-2
            shadow-[0_10px_40px_rgba(0,0,0,0.08)]
            border
            border-[#F1E2DB]
            flex
            flex-col
            sm:flex-row
            gap-2
          "
        >
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              flex-1
              px-6
              py-4
              rounded-full
              outline-none
              text-[#2F1E1A]
              bg-transparent
            "
            required
          />

          <button
            type="submit"
            className="
              bg-[#D88770]
              hover:bg-[#c57661]
              text-white
              px-8
              py-4
              rounded-full
              font-semibold
              transition-all
              duration-300
              hover:scale-105
            "
          >
            Join Us
          </button>
        </form>

        {/* Small Text */}
        <p className="text-xs text-gray-400 mt-4">
          No spam. Only exclusive fashion updates and member offers.
        </p>

      </div>
    </section>
  );
}

export default NewLetterBox;