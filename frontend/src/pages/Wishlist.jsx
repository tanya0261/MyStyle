import React, { useContext, useEffect, useState ,  } from "react";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

function Wishlist() {
  const navigate = useNavigate();

  const { serverUrl } = useContext(authDataContext);
  const { userData , fetchCartCount } = useContext(userDataContext);
  const { currency } = useContext(shopDataContext);

  const [wishlistItems, setWishlistItems] = useState([]);
  
  
  const [selectedSize, setSelectedSize] = useState({});

  const [quickAddItem, setQuickAddItem] = useState(null);

  const fetchWishlist = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/wishlist/get",
        {
          userId: userData._id,
        }
      );

      setWishlistItems(result.data.wishlist);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData?._id) {
      fetchWishlist();
    }
  }, [userData]);

  

  const removeWishlistItem = async (productId) => {
    try {
      await axios.post(
        serverUrl + "/api/wishlist/remove",
        {
          userId: userData._id,
          productId,
        }
      );

      fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddToCart = async (productId) => {
  try {
    const size = selectedSize[productId];

    if (!size) {
      alert("Please select a size");
      return;
    }

    await axios.post(
      serverUrl + "/api/cart/add",
      {
        userId: userData._id,
        productId,
        size,
      },
      {
        withCredentials: true,
      }
    );

    await axios.post(
      serverUrl + "/api/wishlist/remove",
      {
        userId: userData._id,
        productId,
      },
      {
        withCredentials: true,
      }
    );
    

    await fetchCartCount(); // ADD THIS
    fetchWishlist();

    setQuickAddItem(null);

    setSelectedSize((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });

  } catch (error) {
    console.log(error);
    console.log(error.response?.data);
  }
};
  return (
    <div className="min-h-screen bg-[#FDFBF9] pt-2 md:pt-4 px-4 sm:px-6 pb-24">
      <div className="max-w-7xl mx-auto">

        {/* Back Button */}
        <div className="mb-5">
          <button
            onClick={() => navigate("/collections")}
            className="
              flex
              items-center
              gap-2
              text-[#2F1E1A]
              hover:text-[#D88770]
              transition-all
              font-medium
            "
          >
            <FaArrowLeft />
            Back to Collection
          </button>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2F1E1A] mb-8">
          My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#E8DED8] text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#2F1E1A] mb-4">
              Your Wishlist Is Empty
            </h2>

            <p className="text-gray-500 mb-8">
              Save your favorite styles here.
            </p>

            <button
              onClick={() => navigate("/collections")}
              className="
                px-8
                py-4
                bg-[#D88770]
                text-white
                rounded-full
                hover:scale-105
                transition-all
              "
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-4
              md:gap-6
            "
          >
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="
                  bg-white
                  rounded-2xl
                  overflow-hidden
                  border
                  border-[#E8DED8]
                  shadow-sm
                  hover:shadow-lg
                  transition-all
                "
              >
                {/* Product Image */}
                <div className="relative">
  <img
    src={item.image1}
    alt={item.name}
    className="
      w-full
      h-[180px]
      sm:h-[220px]
      md:h-[260px]
      lg:h-[300px]
      object-cover
    "
  />

  {/* Quick Add Button */}
  <button
  onClick={(e) => {
  e.stopPropagation();
  setQuickAddItem(item);
   }}
    className="
      absolute
      top-3
      right-3
      w-10
      h-10
      rounded-full
      bg-white
      shadow-lg
      flex
      items-center
      justify-center
      text-[#D88770]
      hover:scale-110
      transition-all
    "
  >
    <FaPlus />
  </button>
</div>

                {/* Product Details */}
                <div className="p-3 md:p-4">

                  <h2
                    className="
                      text-sm
                      sm:text-base
                      md:text-lg
                      font-semibold
                      text-[#2F1E1A]
                      line-clamp-2
                      min-h-[48px]
                    "
                  >
                    {item.name}
                  </h2>

                  <p className="mt-1 text-[#D88770] text-base md:text-lg font-semibold">
                    {currency}
                    {item.price}
                  </p>
                 

                  <div className="mt-4 flex flex-col gap-2">

                    <button
                      onClick={() =>
                        navigate(`/productdetails/${item._id}`)
                      }
                      className="
                        w-full
                        py-2.5
                        rounded-xl
                        bg-[#2F1E1A]
                        text-white
                        text-sm
                        hover:bg-[#D88770]
                        transition-all
                      "
                    >
                      View Product
                    </button>

                    <button
                      onClick={() =>
                        removeWishlistItem(item._id)
                      }
                      className="
                        w-full
                        py-2.5
                        rounded-xl
                        border
                        border-red-300
                        bg-red-50
                        text-red-500
                        text-sm
                        hover:bg-red-100
                        transition-all
                      "
                    >
                      Remove
                    </button>

                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
        {quickAddItem && (
  <div
    className="
      fixed inset-0
      bg-black/50
      flex items-center justify-center
      z-50
    "
    onClick={() => setQuickAddItem(null)}
  >
    <div
      className="
        bg-white
        rounded-3xl
        p-6
        w-[90%]
        max-w-md
      "
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="float-right text-xl font-bold"
        onClick={() => setQuickAddItem(null)}
      >
        ✕
      </button>

      <img
        src={quickAddItem.image1}
        alt={quickAddItem.name}
        className="
          w-full
          h-64
          object-cover
          rounded-2xl
          mb-4
        "
      />

      <h2 className="text-xl font-semibold mb-2">
        {quickAddItem.name}
      </h2>

      <p className="text-[#D88770] font-semibold mb-4">
        {currency}
        {quickAddItem.price}
      </p>

      <p className="font-medium mb-2">
        Select Size
      </p>

      <div className="flex gap-2 flex-wrap mb-4">
        {quickAddItem.sizes?.map((size) => (
          <button
            key={size}
            onClick={() =>
              setSelectedSize({
                ...selectedSize,
                [quickAddItem._id]: size,
              })
            }
            className={`
              px-4 py-2 rounded-full border
              ${
                selectedSize[quickAddItem._id] === size
                  ? "bg-[#D88770] text-white border-[#D88770]"
                  : "bg-white"
              }
            `}
          >
            {size}
          </button>
        ))}
      </div>

      <button
        onClick={() =>
          handleAddToCart(quickAddItem._id)
        }
        className="
          w-full
          py-3
          rounded-xl
          bg-[#D88770]
          text-white
          font-semibold
        "
      >
        Add To Cart
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  );
}

export default Wishlist;