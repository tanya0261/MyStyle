import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HiOutlinePlusCircle,
  HiOutlineClipboardList,
  HiOutlineShoppingBag,
} from "react-icons/hi";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="
        w-full
        lg:w-64
        bg-white
        border-r
        border-[#F3E2DB]
        shadow-sm
      "
    >
      {/* Title */}
      <div className="p-6 border-b border-[#F3E2DB]">
        <h2 className="text-xl font-bold text-[#2F1E1A]">
          Dashboard
        </h2>

        <p className="text-sm text-[#D88770]">
          Admin Controls
        </p>
      </div>

      {/* Menu */}
      <div className="p-4">
        <div className="flex flex-col gap-3">

          {/* Add Product */}
          <div
            onClick={() => navigate("/add")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300
            ${
              location.pathname === "/add"
                ? "bg-[#D88770] text-white"
                : "hover:bg-[#F8E7E2] text-[#2F1E1A]"
            }`}
          >
            <HiOutlinePlusCircle size={24} />

            <p className="font-medium">
              Add Product
            </p>
          </div>

          {/* Product List */}
          <div
            onClick={() => navigate("/list")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300
            ${
              location.pathname === "/list"
                ? "bg-[#D88770] text-white"
                : "hover:bg-[#F8E7E2] text-[#2F1E1A]"
            }`}
          >
            <HiOutlineClipboardList size={24} />

            <p className="font-medium">
              Product List
            </p>
          </div>

          {/* Orders */}
          <div
            onClick={() => navigate("/orders")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300
            ${
              location.pathname === "/orders"
                ? "bg-[#D88770] text-white"
                : "hover:bg-[#F8E7E2] text-[#2F1E1A]"
            }`}
          >
            <HiOutlineShoppingBag size={24} />

            <p className="font-medium">
              Orders
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Sidebar;