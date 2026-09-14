import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";

function Nav() {
  const navigate = useNavigate();
  let {serverUrl} = useContext(authDataContext)
  let {getAdmin} = useContext(adminDataContext)

  const logOut = async () => {
    try {
        const result = await axios.get(serverUrl + "/api/auth/logout",{withCredentials:true})
        console.log(result.data)
        getAdmin()
        navigate("/login")
    } catch (error) {
        console.log(error)
    }
  }
  return (
  <nav className="w-full bg-white shadow-sm border-b border-[#F3E2DB] px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
    
    <div
      onClick={() => navigate("/")}
      className="flex items-center gap-2 sm:gap-3 cursor-pointer"
    >
      <img
        src={logo}
        alt="MyStyle Logo"
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-md"
      />

      <div>
        <h1 className="text-lg sm:text-2xl font-bold text-[#2F1E1A]">
          MyStyle
        </h1>

        <p className="text-[10px] sm:text-xs uppercase tracking-[2px] sm:tracking-[3px] text-[#D88770]">
          Admin Panel
        </p>
      </div>
    </div>

    <button
      onClick={logOut}
      className="
        bg-[#D88770]
        hover:bg-[#c7745d]
        text-white
        px-3 sm:px-6
        py-2
        text-sm sm:text-base
        rounded-xl
        font-medium
        transition-all
        duration-300
      "
    >
      Logout
    </button>

  </nav>
);
}

export default Nav;