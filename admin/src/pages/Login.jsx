import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";
import { authDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";

function Login() {
  const { serverUrl } = useContext(authDataContext);
  const {adminData , getAdmin} = useContext(adminDataContext)
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const AdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Sending:", formData);

      const result = await axios.post(
        `${serverUrl}/api/auth/adminlogin`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(result.data);

      toast.success("Login Successful");
       await getAdmin()
      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Invalid Admin Credentials"
      );
    } finally {
    setLoading(false);
  }
  };

  return (
    <div className="min-h-screen bg-[#F8F4F1] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl bg-white rounded-[40px] overflow-hidden shadow-2xl grid lg:grid-cols-2">

        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-center bg-[#F8E7E2] p-12">

          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg mb-8">
            <HiOutlineShieldCheck
              size={50}
              className="text-[#D88770]"
            />
          </div>

          <h1 className="text-5xl font-bold text-[#2F1E1A] leading-tight">
            Admin
            <br />
            Dashboard
          </h1>

          <div className="w-20 h-[3px] bg-[#D88770] my-8"></div>

          <p className="text-gray-600 text-lg leading-relaxed">
            Manage products, orders,
            customers and inventory
            from one place.
          </p>

          <div className="mt-10">
            <img
              src={logo}
              alt="My Style Logo"
              className="w-28"
            />
          </div>

        </div>

        {/* Right Section */}
        <div className="p-8 md:p-14 flex flex-col justify-center">

          <div className="text-center mb-10">

            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 rounded-full bg-[#F8E7E2] flex items-center justify-center">
                <HiOutlineShieldCheck
                  size={40}
                  className="text-[#D88770]"
                />
              </div>
            </div>

            <h2 className="text-4xl font-bold text-[#2F1E1A]">
              Admin Login
            </h2>

            <p className="text-gray-500 mt-3">
              Secure access to My Style Dashboard
            </p>

          </div>

          <form onSubmit={AdminLogin} className="space-y-5">

            <input
              type="email"
              disabled={loading}
              name="email"
              placeholder="Admin Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className="w-full p-4 rounded-2xl border border-[#ECDDD7] focus:border-[#D88770] outline-none"
            />

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                disabled={loading}
                name="password"
                placeholder="Admin Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                className="w-full p-4 pr-12 rounded-2xl border border-[#ECDDD7] focus:border-[#D88770] outline-none"
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

            <button
  type="submit"
  disabled={loading}
  className="
    w-full
    bg-[#D88770]
    hover:bg-[#c7745d]
    text-white
    py-4
    rounded-2xl
    font-semibold
    transition-all
    duration-300
    shadow-lg
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
>
  {loading ? "Signing In..." : "Access Dashboard"}
</button>
          </form>

          <div className="mt-8 bg-[#FFF6F2] border border-[#F3D1C5] rounded-2xl p-4">
            <p className="text-center text-[#D88770] font-medium">
              ✨ My Style Administration Panel
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;