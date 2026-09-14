import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";

import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import { authDataContext } from "../context/AuthContext.jsx";
import { signInWithPopup } from "firebase/auth";
import { auth , provider } from "../../utils/Firebase.js";
import { userDataContext } from "../context/UserContext.jsx";

function Registration() {
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();
  const {userdata , getCurrentUser} = useContext(userDataContext)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
  e.preventDefault();

  console.log("========== SIGNUP CLICKED ==========");
  console.log("Form Data:", formData);
  console.log("Server URL:", serverUrl);

  if (formData.password !== formData.confirmPassword) {
    console.log("Passwords do not match");
    toast.error("Passwords do not match");
    return;
  }

  try {
    console.log("Sending request...");

    const result = await axios.post(
      `${serverUrl}/api/auth/registration`,
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
      {
        withCredentials: true,
      }
    );

    console.log("SUCCESS RESPONSE:");
    console.log(result);

    console.log("SUCCESS DATA:");
    console.log(result.data);

    toast.success("Account Created Successfully");

    getCurrentUser()
     navigate("/");

  } catch (error) {
  console.log("ERROR RESPONSE:");

  console.log(error.response);

  console.log("MESSAGE:");

  console.log(error.response?.data);

  toast.error(
    error.response?.data?.message ||
    "Something went wrong"
  );
}
};
console.log("Registration Component Rendered");

const googleSignup = async () => {
  try {
    const response = await signInWithPopup(auth, provider);

    const user = response.user;
    const name = user.displayName;
    const email = user.email;

    const result = await axios.post(
      `${serverUrl}/api/auth/googlelogin`,
      {
        name,
        email,
      },
      {
        withCredentials: true,
      }
    );
    console.log(result.data)
    
    getCurrentUser()
    navigate("/"); // redirect after successful login

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      error.message ||
      "Google Login Failed"
    );
  }
};
  return (
    <div className="min-h-screen bg-[#FFF8F4] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-[40px] overflow-hidden shadow-2xl grid lg:grid-cols-2">
        
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-[#F8E7E2] p-12">
          <h1 className="text-6xl font-light text-[#1E1E1E] leading-tight">
            My
            <br />
            Style
          </h1>

          <div className="w-20 h-[2px] bg-[#D4AF37] my-8"></div>

          <p className="text-gray-600 text-lg leading-relaxed">
            Discover timeless fashion,
            curated collections and
            personalized luxury shopping.
          </p>

          <div className="mt-12">
            <img
              src={logo}
              alt="logo"
              onClick={() => navigate("/")}
              className="w-44 cursor-pointer hover:scale-105 transition duration-300"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-14 flex flex-col justify-center">
          <div className="text-center mb-10">

  <img
    src={logo}
    alt="My Style Logo"
    onClick={() => navigate("/")}
    className="w-24 mx-auto mb-5 cursor-pointer hover:scale-105 transition duration-300"
  />

  <h2 className="text-4xl font-light text-[#1E1E1E]">
    Create Account
  </h2>

  <p className="text-gray-500 mt-3">
    Join My Style today
  </p>

</div>

          <form onSubmit={handleSignup} className="space-y-5">
            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-2xl border border-[#F1E4DD] focus:border-[#D4AF37] outline-none"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-2xl border border-[#F1E4DD] focus:border-[#D4AF37] outline-none"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-4 pr-12 rounded-2xl border border-[#F1E4DD] focus:border-[#D4AF37] outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <IoEyeOffOutline size={22} />
                ) : (
                  <IoEyeOutline size={22} />
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full p-4 pr-12 rounded-2xl border border-[#F1E4DD] focus:border-[#D4AF37] outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? (
                  <IoEyeOffOutline size={22} />
                ) : (
                  <IoEyeOutline size={22} />
                )}
              </button>
            </div>

            {/* Submit Button */}
           <button
           type="submit"
           className="w-full bg-[#D4AF37] hover:opacity-90 text-white py-4 rounded-2xl font-medium transition duration-300"
          >
           Create Account
           </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Button */}
          <button
           type="button"
           className="w-full border border-[#EADDD5] py-4 rounded-2xl bg-white hover:bg-[#FFF8F4] transition flex items-center justify-center gap-3 font-medium text-[#1E1E1E]"
            onClick={googleSignup}
>
            <FcGoogle size={24} />
            Continue with Google
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-500 mt-8">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="text-[#D4AF37] font-medium cursor-pointer ml-2 hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;