import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF8F4] flex items-center justify-center px-4">
      <div className="text-center max-w-xl">

        <h1 className="text-8xl md:text-9xl font-bold text-[#D4AF37]">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-semibold text-[#1E1E1E] mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-4 text-lg">
          Sorry, the page you're looking for doesn't exist
          or has been moved.
        </p>

        <button
          onClick={() => navigate("/")}
          className="
            mt-8
            bg-[#D4AF37]
            hover:opacity-90
            text-white
            px-8
            py-3
            rounded-2xl
            font-medium
            transition
          "
        >
          Back to Home
        </button>

      </div>
    </div>
  );
}

export default NotFound;