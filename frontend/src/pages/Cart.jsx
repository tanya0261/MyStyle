import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaTrash,
  FaArrowLeft,
} from "react-icons/fa";

function Cart() {
  const navigate = useNavigate();

  const { serverUrl } = useContext(authDataContext);

  const {
  userData,
  fetchCartCount
} = useContext(userDataContext);

  const { currency } = useContext(shopDataContext);

  const [cartItems, setCartItems] = useState([]);

  const [loadingId, setLoadingId] = useState(null);

 const fetchCart = async () => {
  try {
    if (!userData?._id) return;

    const result = await axios.post(
      serverUrl + "/api/cart/get",
      {
        userId: userData._id,
      }
    );

    console.log("Cart API:", result.data);

    setCartItems(result.data.cart);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    try {
      if (userData?._id) {
        fetchCart();
      }
    } catch (error) {
      console.log(error);
    }
  }, [userData]);

  const updateQuantity = async (
  cartItemId,
  quantity
) => {
  try {
    await axios.put(
      serverUrl + "/api/cart/update",
      {
        userId: userData._id,
        cartItemId,
        quantity,
      }
    );

    await fetchCart();
    await fetchCartCount();
  } catch (error) {
    console.log(error);
  }
};

  const removeItem = async (cartItemId) => {
  try {
    setLoadingId(cartItemId);

    await axios.delete(
  serverUrl + "/api/cart/remove",
  {
    data: {
      userId: userData._id,
      cartItemId,
    },
  }
);

await fetchCart();
await fetchCartCount();
  } catch (error) {
    console.log(error);
  } finally {
    setLoadingId(null);
  }
};

  const moveToWishlist = async (item) => {
  try {
    setLoadingId(item._id);

    await axios.post(
      serverUrl + "/api/wishlist/add",
      {
        userId: userData._id,
        productId: item.product._id,
      }
    );

    await axios.delete(
      serverUrl + "/api/cart/remove",
      {
        data: {
          userId: userData._id,
          cartItemId: item._id,
        },
      }
    );

    await fetchCart();
    await fetchCartCount();
  } catch (error) {
    console.log(error);
  } finally {
    setLoadingId(null);
  }
};
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);
 console.log("Cart Length:", cartItems.length);
 console.log("Cart Items:", cartItems);
 {cartItems.map((item) => {
  console.log(item.product);
  return null;
})}
  return (
    <div className="min-h-screen bg-[#FDFBF9] pt-2 md:pt-4 px-4 md:px-8">

      <div className="max-w-7xl mx-auto">

  <div className="mb-6">
    <button
      onClick={() => navigate(-1)}
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
      Back
    </button>
  </div>

  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2F1E1A] mb-10">
    Shopping Cart
  </h1>

        {cartItems.length === 0 ? (

          <div className="bg-white rounded-3xl p-12 border border-[#E8DED8] text-center">

            <h2 className="text-3xl font-semibold text-[#2F1E1A] mb-4">
              Your Cart Is Empty
            </h2>

            <p className="text-gray-500 mb-8">
              Looks like you haven't added anything yet.
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
              Continue Shopping
            </button>

          </div>

        ) : (

          <div className="space-y-6">
            
            {cartItems.map((item) => (

              <div
                key={item._id}
                className={`
                  bg-white
                  border
                  border-[#E8DED8]
                  rounded-3xl
                  p-4 sm:p-6
                  flex
                  flex-row
                  md:flex-row
                  gap-4
                  items-center
                  transition-all
                  duration-300
                  ${
                    loadingId === item._id
                      ? "opacity-50 scale-95"
                      : ""
                  }
                `}
              >

                <img
                src={item.product.image1}
                alt={item.product.name}
                onClick={() =>
                navigate(`/productdetails/${item.product._id}`)
                }
                className="
                 w-20
                 h-20
                 sm:w-24
                 sm:h-24
                 md:w-32
                 md:h-36
                 object-cover
                 rounded-xl
                 cursor-pointer
                 hover:scale-105
                 transition-all
                 "
                 />

                <div className="flex-1 text-left">

                  <h2 className="text-sm sm:text-base md:text-xl font-bold text-[#2F1E1A] line-clamp-2">
                  {item.product.name}
                  </h2>

                  <p className="text-[#D88770] text-xl mt-2">
                    {currency}
                    {item.product.price}
                  </p>

                  <p className="mt-2 text-gray-500">
                    Size : {item.size}
                  </p>

                  <div className="flex items-center gap-3 mt-2">

  <button
    onClick={() => {
      if (item.quantity === 1) {
  removeItem(item._id);
} else {
  updateQuantity(
    item._id,
    item.quantity - 1
  );
}
    }}
    className="
      w-8
      h-8
      rounded-full
      bg-[#E8DED8]
      hover:bg-[#D88770]
      hover:text-white
      transition-all
    "
  >
    -
  </button>

  <span className="font-medium">
    {item.quantity}
  </span>

  <button
    onClick={() =>
      updateQuantity(
        item._id,
        item.quantity + 1
      )
    }
    className="
      w-8
      h-8
      rounded-full
      bg-[#E8DED8]
      hover:bg-[#D88770]
      hover:text-white
      transition-all
    "
  >
    +
  </button>

</div>

                </div>

                <div className="flex flex-col gap-2 w-auto">

                  <button
                    onClick={() =>
                    moveToWishlist(item)
                   }
                    className="
                    flex-1
                    px-5
                    py-2
                  bg-[#D88770]
                  text-white
                    rounded-full
                    hover:opacity-90
                    transition-all
                    flex
                    items-center
                    justify-center
                     gap-2
                     "
                  >
                    <FaHeart />
                    Wishlist
                  </button>

                  <button
                    onClick={() =>
                    removeItem(item._id)
                    }
                    className="
                    px-3
                    sm:px-5
                    py-2
                    text-xs
                    sm:text-sm
                   bg-red-500
                   text-white
                     rounded-full
                   hover:bg-red-600
                     transition-all
                     flex
                     items-center
                     justify-center
                     gap-2
                    "
                  >
                    <FaTrash />
                    Remove
                  </button>

                </div>

              </div>

            ))}

            <div
             className="
             bg-white
             border
             border-[#E8DED8]
              rounded-3xl
              p-5
              mb-24
              md:mb-0
              flex
              flex-col
              md:flex-row
              justify-between
              items-center
               gap-5
               "
                >

              <div>

                <h2 className="text-2xl font-bold text-[#2F1E1A]">
                  Total Items : {totalItems}
                </h2>

                <p className="text-[#D88770] text-xl mt-2 font-semibold">
                  Total : {currency}
                  {totalPrice}
                </p>

              </div>

              <button
  onClick={() => {
    if (cartItems.length > 0) {
      navigate("/placeorder");
    } else {
      console.log("Your cart is empty");
    }
  }}
  className="
    w-full
    md:w-auto
    px-8
    py-4
    bg-[#2F1E1A]
    text-white
    rounded-full
    hover:bg-[#D88770]
    transition-all
  "
>
  Proceed To Checkout
</button>
            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Cart;