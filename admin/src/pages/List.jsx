import React, { useState, useContext, useEffect } from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import { authDataContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Lists() {
  const [list, setList] = useState([]);

  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/product/list`
      );

      setList(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeList = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const result = await axios.post(
        `${serverUrl}/api/product/remove/${id}`,
        {},
        { withCredentials: true }
      );

      if (result.data.success) {
        alert("Product Deleted Successfully");
        fetchList();
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF9]">
      <Nav />

      <div className="flex">

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <div className="flex-1 p-3 sm:p-5 lg:p-8">

          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="
              flex
              items-center
              gap-2
              bg-white
              border
              border-[#EADDD5]
              px-4
              py-2
              rounded-xl
              shadow-sm
              mb-5
              hover:bg-[#FFF4F0]
              transition
            "
          >
            ← Dashboard
          </button>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E1E1E]">
              All Listed Products
            </h1>

            <p className="text-[#7A7A7A] mt-2 text-sm sm:text-base">
              Manage your luxury fashion inventory
            </p>
          </div>

          {list.length === 0 ? (
            <div className="bg-white border border-[#EADDD5] rounded-xl p-10 text-center shadow-sm">
              <p className="text-gray-500 text-lg">
                No Products Available
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Header */}
              <div
                className="
                  hidden
                  xl:grid
                  grid-cols-[100px_2fr_1fr_1fr_1fr]
                  bg-white
                  border
                  border-[#EADDD5]
                  rounded-xl
                  px-5
                  py-4
                  font-semibold
                  shadow-sm
                "
              >
                <p>Image</p>
                <p>Name</p>
                <p>Category</p>
                <p>Price</p>
                <p>Action</p>
              </div>

              <div className="mt-4 flex flex-col gap-3">

                {list.map((item) => (
                  <div
                    key={item._id}
                    className="
                      bg-white
                      border
                      border-[#EADDD5]
                      rounded-xl
                      p-3
                      shadow-sm
                    "
                  >

                    {/* Mobile + Tablet */}
                    <div className="xl:hidden">

                      <div className="flex gap-3 items-center">

                        <img
                          src={item.image1}
                          alt={item.name}
                          className="
                            w-16
                            h-16
                            sm:w-20
                            sm:h-20
                            object-cover
                            rounded-lg
                            border
                            border-[#EADDD5]
                            flex-shrink-0
                          "
                        />

                        <div className="flex-1 min-w-0">

                          <h3 className="font-medium text-sm sm:text-base text-[#1E1E1E] truncate">
                            {item.name}
                          </h3>

                          <p className="text-xs text-[#6B6B6B] mt-1">
                            {item.category}
                          </p>

                          <p className="font-semibold text-sm text-[#D4AF37] mt-1">
                            ₹{item.price}
                          </p>

                          <button
                            onClick={() =>
                              removeList(item._id)
                            }
                            className="
                              mt-2
                              px-3
                              py-1
                              text-xs
                              rounded-lg
                              bg-red-50
                              text-red-500
                              hover:bg-red-100
                              transition
                            "
                          >
                            Delete
                          </button>

                        </div>

                      </div>

                    </div>

                    {/* Desktop Layout */}
                    <div
                      className="
                        hidden
                        xl:grid
                        grid-cols-[100px_2fr_1fr_1fr_1fr]
                        items-center
                        gap-4
                      "
                    >
                      <img
                        src={item.image1}
                        alt={item.name}
                        className="
                          w-20
                          h-20
                          object-cover
                          rounded-lg
                          border
                          border-[#EADDD5]
                        "
                      />

                      <p className="font-medium text-[#1E1E1E]">
                        {item.name}
                      </p>

                      <p className="text-[#6B6B6B]">
                        {item.category}
                      </p>

                      <p className="font-semibold text-[#D4AF37]">
                        ₹{item.price}
                      </p>

                      <button
                        onClick={() =>
                          removeList(item._id)
                        }
                        className="
                          w-fit
                          px-4
                          py-2
                          rounded-lg
                          bg-red-50
                          text-red-500
                          hover:bg-red-100
                          transition-all
                        "
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default Lists;