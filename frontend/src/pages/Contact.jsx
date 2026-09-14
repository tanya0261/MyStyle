import React from "react";
import ContactUs from "../assets/ContactUs.jpg";

function Contact() {
  return (
    <div className="relative bg-gradient-to-b from-[#FDFBF9] via-[#FFF6F2] to-[#F8F4F1] overflow-x-hidden">

      {/* Background Glow */}
      <div className="absolute left-0 top-40 w-72 h-72 bg-[#D88770]/10 rounded-full blur-3xl"></div>
      <div className="absolute right-0 bottom-40 w-72 h-72 bg-[#D88770]/10 rounded-full blur-3xl"></div>

      {/* HERO */}
      <section className="pt-8 pb-16 md:pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">

          <p className="uppercase tracking-[8px] text-[#D88770] text-sm mb-4">
            Contact Us
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#2F1E1A] leading-tight">
            Let's Start A Conversation
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-gray-500 text-base md:text-lg leading-relaxed">
            Whether you need help with an order, product information,
            partnership inquiries or career opportunities, we'd love
            to hear from you.
          </p>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="pb-20 md:pb-28 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* FORM */}
            <div
              className="
              bg-gradient-to-br
              from-white
              to-[#FFF6F2]
              border
              border-[#E8DED8]
              rounded-[32px]
              p-6
              sm:p-8
              md:p-12
              shadow-[0_20px_60px_rgba(216,135,112,0.12)]
            "
            >

              <p className="uppercase tracking-[6px] text-[#D88770] text-sm mb-4">
                Get In Touch
              </p>

              <h2 className="text-3xl md:text-5xl font-bold text-[#2F1E1A] mb-10 leading-tight">
                Contact Us Or Explore Careers
              </h2>

              <form className="space-y-5">

                <input
                  type="text"
                  placeholder="Your Name"
                  className="
                  w-full
                  bg-[#FFFBF8]
                  border
                  border-[#E8DED8]
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-[#D88770]
                  focus:ring-4
                  focus:ring-[#D88770]/15
                  transition-all
                  "
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="
                  w-full
                  bg-[#FFFBF8]
                  border
                  border-[#E8DED8]
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-[#D88770]
                  focus:ring-4
                  focus:ring-[#D88770]/15
                  transition-all
                  "
                />

                <input
                  type="text"
                  placeholder="Subject"
                  className="
                  w-full
                  bg-[#FFFBF8]
                  border
                  border-[#E8DED8]
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-[#D88770]
                  focus:ring-4
                  focus:ring-[#D88770]/15
                  transition-all
                  "
                />

                <textarea
                  rows="6"
                  placeholder="Your Message"
                  className="
                  w-full
                  bg-[#FFFBF8]
                  border
                  border-[#E8DED8]
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  resize-none
                  focus:border-[#D88770]
                  focus:ring-4
                  focus:ring-[#D88770]/15
                  transition-all
                  "
                />

                <button
                  type="submit"
                  className="
                  bg-[#2F1E1A]
                  text-white
                  px-8
                  py-4
                  rounded-full
                  font-medium
                  hover:bg-[#D88770]
                  transition-all
                  duration-300
                  "
                >
                  Send Message
                </button>

              </form>

            </div>

            {/* IMAGE */}
            <div className="relative">

              <img
                src={ContactUs}
                alt="Contact Us"
                className="
                w-full
                h-[450px]
                md:h-[650px]
                object-cover
                rounded-[32px]
                shadow-[0_20px_60px_rgba(216,135,112,0.15)]
                "
              />

              <div className="absolute inset-0 bg-black/30 rounded-[32px]" />

              <div className="absolute bottom-8 left-8 right-8 text-white">

                <p className="uppercase tracking-[6px] text-sm mb-3">
                  Careers At My Style
                </p>

                <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                  Want To Join
                  <br />
                  The My Style Team?
                </h3>

                <p className="text-white/90 text-sm md:text-base leading-relaxed">
                  We're always looking for passionate individuals
                  who love fashion, creativity and innovation.
                  If you'd like to explore career opportunities
                  at My Style, reach out to us and let's build
                  something extraordinary together.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="grid md:grid-cols-3 gap-6">

            <div
              className="
              bg-gradient-to-b
              from-white
              to-[#FFF7F4]
              border
              border-[#E8DED8]
              rounded-[28px]
              p-8
              text-center
              hover:-translate-y-2
              hover:shadow-[0_20px_40px_rgba(216,135,112,0.15)]
              transition-all
              duration-300
            "
            >
              <h3 className="text-2xl font-semibold text-[#2F1E1A] mb-3">
                Email
              </h3>

              <p className="text-gray-500">
                support@mystyle.com
              </p>
            </div>

            <div
              className="
              bg-gradient-to-b
              from-white
              to-[#FFF7F4]
              border
              border-[#E8DED8]
              rounded-[28px]
              p-8
              text-center
              hover:-translate-y-2
              hover:shadow-[0_20px_40px_rgba(216,135,112,0.15)]
              transition-all
              duration-300
            "
            >
              <h3 className="text-2xl font-semibold text-[#2F1E1A] mb-3">
                Phone
              </h3>

              <p className="text-gray-500">
                +91 98765 43210
              </p>
            </div>

            <div
              className="
              bg-gradient-to-b
              from-white
              to-[#FFF7F4]
              border
              border-[#E8DED8]
              rounded-[28px]
              p-8
              text-center
              hover:-translate-y-2
              hover:shadow-[0_20px_40px_rgba(216,135,112,0.15)]
              transition-all
              duration-300
            "
            >
              <h3 className="text-2xl font-semibold text-[#2F1E1A] mb-3">
                Location
              </h3>

              <p className="text-gray-500">
                New Delhi, India
              </p>
            </div>

          </div>

        </div>
      </section>

      <section className="pb-24">
  <div className="max-w-5xl mx-auto px-4 sm:px-6">

    <div className="
      bg-white
      border border-[#E8DED8]
      rounded-[40px]
      p-10 md:p-16
      text-center
      shadow-sm
    ">

      <p className="uppercase tracking-[6px] text-[#D88770] text-sm mb-4">
        Careers & Opportunities
      </p>

      <h2 className="text-4xl md:text-6xl font-bold text-[#2F1E1A] leading-tight">
        Join The My Style Team
      </h2>

      <div className="w-20 h-[2px] bg-[#D88770] mx-auto mt-6"></div>

      <p className="max-w-2xl mx-auto mt-8 text-gray-500 text-lg leading-relaxed">
        We are always looking for passionate individuals who love
        fashion, creativity and innovation. Explore opportunities
        and grow with My Style.
      </p>

      <button
        className="
          mt-10
          px-8
          py-4
          bg-[#2F1E1A]
          text-white
          rounded-full
          hover:bg-[#D88770]
          transition-all
          duration-300
        "
      >
        Explore Careers
      </button>

    </div>

  </div>
</section>

    </div>
  );
}

export default Contact;