import React, { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

function Card({ name, image, id, price }) {
  const { currency } = useContext(shopDataContext);
  const navigate = useNavigate();

  return (
    <div
      className="group cursor-pointer"
      onClick={() => navigate(`/productdetails/${id}`)}
    >
      <div className="overflow-hidden rounded-xl bg-white">
        <img
          src={image}
          alt={name}
          className="
            w-full
            aspect-[3/4]
            object-cover
            rounded-xl
            group-hover:scale-105
            transition-all
            duration-500
          "
        />
      </div>

      <div className="pt-3">
        <p className="text-[#2F1E1A] text-lg font-medium line-clamp-2">
          {name}
        </p>

        <p className="mt-1 text-[#D88770] font-semibold text-lg">
          {currency}
          {price}
        </p>
      </div>
    </div>
  );
}

export default Card;