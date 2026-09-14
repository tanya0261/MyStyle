import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#2F1E1A] text-white mt-16">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo Section */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src={logo}
                alt="My Style"
                className="w-14 h-14 object-contain"
              />

              <h2 className="text-2xl font-semibold">
                My Style
              </h2>
            </div>

            <p className="text-[#D8C7C1] leading-relaxed">
              Elevate your wardrobe with timeless fashion,
              premium quality, and modern elegance designed
              for every occasion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-[#D8C7C1]">
              <li
                onClick={() => navigate("/")}
                className="cursor-pointer hover:text-[#D88770]"
              >
                Home
              </li>

              <li
                onClick={() => navigate("/collections")}
                className="cursor-pointer hover:text-[#D88770]"
              >
                Collection
              </li>

              <li
                onClick={() => navigate("/about")}
                className="cursor-pointer hover:text-[#D88770]"
              >
                About Us
              </li>

              <li
                onClick={() => navigate("/contact")}
                className="cursor-pointer hover:text-[#D88770]"
              >
                Contact
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Customer Care
            </h3>

            <ul className="space-y-3 text-[#D8C7C1]">
              <li>Shipping Policy</li>
              <li>Return Policy</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Connect With Us
            </h3>

            <p className="text-[#D8C7C1] mb-2">
              support@mystyle.com
            </p>

            <p className="text-[#D8C7C1] mb-6">
              +91 98765 43210
            </p>

            <div className="flex gap-4">

              <div className="w-10 h-10 rounded-full bg-[#D88770] flex items-center justify-center cursor-pointer hover:scale-110 transition">
                <FaInstagram />
              </div>

              <div className="w-10 h-10 rounded-full bg-[#D88770] flex items-center justify-center cursor-pointer hover:scale-110 transition">
                <FaFacebookF />
              </div>

              <div className="w-10 h-10 rounded-full bg-[#D88770] flex items-center justify-center cursor-pointer hover:scale-110 transition">
                <FaPinterestP />
              </div>

              <div className="w-10 h-10 rounded-full bg-[#D88770] flex items-center justify-center cursor-pointer hover:scale-110 transition">
                <FaTwitter />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#4A372F]">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center text-[#D8C7C1] text-sm">
          © {new Date().getFullYear()} My Style. All Rights Reserved.
        </div>
      </div>

    </footer>
  );
}

export default Footer;