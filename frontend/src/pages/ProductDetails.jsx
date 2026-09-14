import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import Card from "../component/Card";
import axios from "axios";
import { toast } from "react-toastify";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import {
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeft,
} from "react-icons/fa";

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const {
  userData,
  fetchCartCount
  } = useContext(userDataContext);
  const { products, currency } = useContext(shopDataContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartAnimating, setCartAnimating] = useState(false);
  const [wishlistAnimating, setWishlistAnimating] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const fetchProductData = () => {
    try {
      const product = products.find(
        (item) => item._id === productId
      );

      if (product) {
        setProductData(product);
        setImage(product.image1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      fetchProductData();
    } catch (error) {
      console.log(error);
    }
  }, [productId, products]);

  useEffect(() => {
    try {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.log(error);
    }
  }, [productId]);

  useEffect(() => {
  if (!userData?._id || !productId) return;

  const checkWishlistStatus = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/wishlist/get",
        {
          userId: userData._id,
        }
      );

      const exists = result.data.wishlist.some(
        (item) => item._id === productId
      );

       setIsWishlisted(exists);
       } catch (error) {
        console.log(error);
        }
       };

      checkWishlistStatus();
      }, [userData?._id, productId]);

  const handleAddToCart = async () => {
  try {
    if (!userData) {
  toast.warning("Please login or signup to add items to cart");
  navigate("/login");
  return;
}

    if (!size) {
      toast.warning("Please select a size");
      setSizeError(true);

  setTimeout(() => {
    setSizeError(false);
  }, 600);

  return;
}

    setCartAnimating(true);
   console.log("USER:", userData._id);
   console.log("PRODUCT:", productData._id);
   console.log("SIZE:", size);
    const result = await axios.post(
  serverUrl + "/api/cart/add",
  {
    userId: userData._id,
    productId: productData._id,
    size,
  },
  {
    withCredentials: true,
  }
);

console.log(result.data);

    await fetchCartCount();
    toast.success("Product added to cart");

    setTimeout(() => {
      setCartAnimating(false);
    }, 500);

  } catch (error) {
    console.log(error);
    setCartAnimating(false);
  }
  
};

const handleWishlist = async () => {
  try {
    if (!userData) {
  toast.warning("Please login or signup to use wishlist");
  navigate("/login");
  return;
}

    setWishlistAnimating(true);

    if (!isWishlisted) {
      
      await axios.post(
        serverUrl + "/api/wishlist/add",
        {
          userId: userData._id,
          productId: productData._id,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Added to wishlist");
      setIsWishlisted(true);
    } else {
      
      await axios.post(
       serverUrl + "/api/wishlist/remove",
       {
      userId: userData._id,
      productId: productData._id,
      },
       {
     withCredentials: true,
     }
     );
      setIsWishlisted(false);
      toast.info("Removed from wishlist");
    }

    setTimeout(() => {
      setWishlistAnimating(false);
    }, 400);

  } catch (error) {
    console.log(error);
    setWishlistAnimating(false);
  }
};

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  const images = [
    productData.image1,
    productData.image2,
    productData.image3,
    productData.image4,
  ].filter(Boolean);

  const currentIndex = images.indexOf(image);

  const nextImage = () => {
    try {
      const nextIndex =
        currentIndex === images.length - 1
          ? 0
          : currentIndex + 1;

      setImage(images[nextIndex]);
    } catch (error) {
      console.log(error);
    }
  };

  const prevImage = () => {
    try {
      const prevIndex =
        currentIndex === 0
          ? images.length - 1
          : currentIndex - 1;

      setImage(images[prevIndex]);
    } catch (error) {
      console.log(error);
    }
  };

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === productData.category &&
        item._id !== productData._id
    )
    .slice(0, 4);

  return (
    <div className="bg-[#FDFBF9] min-h-screen pt-2 md:pt-4 pb-8 px-4 md:px-8">

      <div className="max-w-7xl mx-auto">

        {/* BACK BUTTON */}
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="
              flex items-center gap-2
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

        {/* PRODUCT SECTION */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* LEFT SIDE */}
          <div>

            <div className="relative border border-[#E8DED8] rounded-[30px] overflow-hidden bg-white">

              <img
                src={image}
                alt={productData.name}
                className="w-full h-[450px] md:h-[700px] object-cover"
              />

              <button
                onClick={prevImage}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  w-11
                  h-11
                  rounded-full
                  bg-white/90
                  shadow-lg
                  flex
                  items-center
                  justify-center
                  hover:bg-[#D88770]
                  hover:text-white
                  transition-all
                "
              >
                <FaChevronLeft />
              </button>

              <button
                onClick={nextImage}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  w-11
                  h-11
                  rounded-full
                  bg-white/90
                  shadow-lg
                  flex
                  items-center
                  justify-center
                  hover:bg-[#D88770]
                  hover:text-white
                  transition-all
                "
              >
                <FaChevronRight />
              </button>

            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 mt-5 overflow-x-auto pb-2">

              {images.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt=""
                  onClick={() => setImage(item)}
                  className={`
                    w-20 h-20
                    md:w-24 md:h-24
                    object-cover
                    rounded-xl
                    cursor-pointer
                    border-2
                    transition-all
                    ${
                      image === item
                        ? "border-[#D88770]"
                        : "border-[#E8DED8]"
                    }
                  `}
                />
              ))}

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div>

            <p className="uppercase tracking-[5px] text-[#D88770] text-sm mb-3">
              Premium Collection
            </p>

            <h1 className="text-3xl md:text-5xl font-bold text-[#2F1E1A] leading-tight">
              {productData.name}
            </h1>

            <p className="mt-6 text-3xl md:text-4xl font-semibold text-[#D88770]">
              {currency}
              {productData.price}
            </p>

            <p className="mt-6 text-gray-600 leading-relaxed">
              {productData.description}
            </p>

            {/* SIZE */}
            <div className="mt-10">

              <h3 className="text-lg font-semibold text-[#2F1E1A] mb-4">
                Select Size
              </h3>

              <div
                className={`
                flex flex-wrap gap-3
                ${sizeError ? "animate-bounce" : ""}
                  `}
                 >
                {productData.sizes?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`
                    px-5 py-3
                    rounded-full
                    border
                     transition-all duration-300

                      ${
                     size === item
                      ? "bg-[#2F1E1A] text-white border-[#2F1E1A]"
                        : sizeError
                      ? "border-red-500 bg-red-50"
                       : "bg-white border-[#E8DED8]"
                         }
                       `}
                        >
                    {item}
                  </button>
                ))}

              </div>

            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-10">

              <button
              onClick={handleAddToCart}
              className={`
               flex-1
             text-white
               py-4
               rounded-full
              font-medium
              transition-all
              duration-300
              ${
              cartAnimating
              ? "bg-green-500 scale-110 shadow-xl"
               : "bg-[#2F1E1A] hover:bg-[#D88770]"
              }
             `}
              >
             {cartAnimating ? "Added ✓" : "Add To Cart"}
             </button>

              <button
              onClick={handleWishlist}
              className={`
              w-14
              h-14
              rounded-full
              border
              flex
              items-center
              justify-center
              transition-all
              duration-300
              hover:scale-110
             ${
             isWishlisted
             ? "bg-red-500 text-white border-red-500"
             : "bg-white border-[#E8DED8]"
             }
             ${
             wishlistAnimating
             ? "scale-125 rotate-12"
             : ""
             }
            `}
              >
            <FaHeart
             className={`
             text-lg
             transition-all
             duration-300
             ${wishlistAnimating ? "animate-pulse" : ""}
             `}
             />
            </button>

            </div>

            {/* EXTRA INFO */}
            <div className="mt-12 border-t border-[#E8DED8] pt-8 space-y-3">

              <p className="text-gray-600">
                ✓ Premium Quality Materials
              </p>

              <p className="text-gray-600">
                ✓ Secure Payment & Checkout
              </p>

              <p className="text-gray-600">
                ✓ Easy Returns & Exchanges
              </p>

              <p className="text-gray-600">
                ✓ Fast Delivery Across India
              </p>

            </div>

          </div>

        </div>

        {/* RELATED PRODUCTS */}
        <section className="mt-24">

          <div className="text-center mb-12">

            <p className="uppercase tracking-[6px] text-[#D88770] text-sm mb-3">
              You May Also Like
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-[#2F1E1A]">
              Related Products
            </h2>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {relatedProducts.map((item) => (
              <Card
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image1}
              />
            ))}

          </div>

        </section>

      </div>

    </div>
  );
}

export default ProductDetails;