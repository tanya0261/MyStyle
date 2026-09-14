import React, {
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  FaSearch,
  FaHeart,
  FaShoppingBag,
  FaUser,
  FaHome,
  FaTshirt,
  FaPhoneAlt,
} from "react-icons/fa";

import logo from "../assets/logo.png";
import { userDataContext } from "../context/UserContext";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Nav() {
  const {
  getCurrentUser,
  userData,
  cartCount
} = useContext(userDataContext);

  const { serverUrl } = useContext(authDataContext);

  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const [search, setSearch] = useState("");

  const navRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setShowSearch(false);
        setShowProfile(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

   

  const handleLogout = async () => {
    try {
      const result = await axios.get(
        serverUrl + "/api/auth/logout",
        {
          withCredentials: true,
        }
      );

      console.log(result.data);

      await getCurrentUser();

      setShowProfile(false);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  
  
  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 w-full bg-white border-b border-[#EADDD5] shadow-sm"
    >
      {/* NAVBAR */}
      <div className="h-16 md:h-18 flex items-center justify-between px-5 md:px-8 lg:px-12">
        
        {/* LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="My Style"
            className="w-11 h-11 object-contain"
          />

          <h1 className="hidden sm:block text-2xl font-light tracking-wide text-[#1E1E1E]">
            My Style
          </h1>
        </div>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex items-center gap-10 text-[#1E1E1E] font-medium text-base">
          <li
            className="cursor-pointer hover:text-[#D88770] transition"
            onClick={() => navigate("/")}
          >
            Home
          </li>

          <li
            className="cursor-pointer hover:text-[#D88770] transition"
            onClick={() => navigate("/collections")}
          >
            Collection
          </li>

          <li
            className="cursor-pointer hover:text-[#D88770] transition"
            onClick={() => navigate("/about")}
          >
            About
          </li>

          <li
            className="cursor-pointer hover:text-[#D88770] transition"
            onClick={() => navigate("/contact")}
          >
            Contact
          </li>
        </ul>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-7 text-xl text-[#1E1E1E]">

          {/* SEARCH */}
          <FaSearch
            className="cursor-pointer hover:text-[#D88770] transition"
            onClick={() => {
              setShowSearch((prev) => !prev);
              setShowProfile(false);
            }}
          />

          {/* WISHLIST */}
          <FaHeart
            className="cursor-pointer hover:text-[#D88770] transition"
            onClick={() => navigate("/wishlist")}
          />

          {/* CART */}
          <div
  className="relative hidden sm:block cursor-pointer"
  onClick={() => navigate("/cart")}
>
  <FaShoppingBag
    className="hover:text-[#D88770] transition"
  />

  {cartCount > 0 && (
    <span
      className="
        absolute
        -top-2
        -right-3
        bg-[#D88770]
        text-white
        text-[10px]
        min-w-[18px]
        h-[18px]
        rounded-full
        flex
        items-center
        justify-center
        font-semibold
      "
    >
      {cartCount}
    </span>
  )}
</div>

          {/* PROFILE */}
          <div className="relative">
            {!userData ? (
              <FaUser
                className="cursor-pointer hover:text-[#D88770] transition"
                onClick={() => {
                  setShowProfile((prev) => !prev);
                  setShowSearch(false);
                }}
              />
            ) : (
              <div
                onClick={() =>
                  setShowProfile(!showProfile)
                }
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-gradient-to-r
                  from-[#D88770]
                  to-[#C57661]
                  text-white
                  flex
                  items-center
                  justify-center
                  font-semibold
                  text-lg
                  shadow-md
                  cursor-pointer
                  hover:scale-105
                  transition-all
                  duration-300
                "
              >
                {userData?.name?.slice(0, 1).toUpperCase()}
              </div>
            )}

            {showProfile && (
              <div
                className="
                  absolute
                  top-14
                  right-0
                  w-56
                  bg-white
                  rounded-2xl
                  shadow-2xl
                  border
                  border-[#EADDD5]
                  overflow-hidden
                  z-50
                "
              >
                {userData && (
                  <div className="bg-[#FFF8F4] px-5 py-4 border-b border-[#EADDD5]">
                    <p className="font-semibold text-[#1E1E1E]">
                      {userData.name}
                    </p>
                  </div>
                )}

                <ul className="text-[#1E1E1E]">
                  {!userData && (
                    <li
                      onClick={() =>
                        navigate("/login")
                      }
                      className="px-5 py-3 hover:bg-[#FFF8F4] hover:text-[#D88770] cursor-pointer"
                    >
                      Login
                    </li>
                  )}

                  {userData && (
                    <>
                      <li
                        className="px-5 py-3 hover:bg-[#FFF8F4] hover:text-[#D88770] cursor-pointer transition-all duration-300"
                        onClick={() =>
                          navigate("/orders")
                        }
                      >
                        Orders
                      </li>

                      <li
                        className="px-5 py-3 hover:bg-[#FFF8F4] hover:text-[#D88770] cursor-pointer transition-all duration-300"
                        onClick={() => {
                          navigate("/about");
                          setShowProfile(false);
                        }}
                      >
                        About
                      </li>

                      <li
                        className="border-t border-[#EADDD5] px-5 py-3 text-red-500 hover:bg-red-50 cursor-pointer transition-all duration-300"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      {showSearch && (
        <div
          className="
            absolute
            top-full
            left-2
             right-2
             mt-4
             z-50
          "
        >
            <div
            className="
             flex
             items-center
             w-full
             px-4
             py-3
             bg-[#FFF8F5]/60
             backdrop-blur-xl
             border
             border-white/30
             rounded-full
             shadow-[0_8px_32px_rgba(216,135,112,0.15)]
             "
             >
            <FaSearch className="text-[#D88770] text-lg mr-3" />

            <input
             type="text"
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             onKeyDown={(e) => {
             if (e.key === "Enter" && search.trim()) {
            console.log("Searching:", search);

            navigate(
            `/collections?search=${encodeURIComponent(search)}`
             );

             setShowSearch(false);
             }
              }}
             placeholder="Search products..."
            className="
              w-full
             bg-transparent
             outline-none
              text-[#2F1E1A]
             placeholder:text-[#8A746B]
             "
             />
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM NAV */}
      <div
        className="
          fixed
          bottom-0
          left-0
          w-full
          bg-white
          border-t
          border-[#EADDD5]
          shadow-lg
          flex
          justify-around
          items-center
          py-3
          md:hidden
          z-50
        "
      >
        <button
          className="flex flex-col items-center text-[#1E1E1E] hover:text-[#D88770]"
          onClick={() => navigate("/")}
        >
          <FaHome size={20} />
          <span className="text-xs mt-1">Home</span>
        </button>

        <button
          className="flex flex-col items-center text-[#1E1E1E] hover:text-[#D88770]"
          onClick={() => navigate("/collections")}
        >
          <FaTshirt size={20} />
          <span className="text-xs mt-1">Collection</span>
        </button>

        <button
          className="flex flex-col items-center text-[#1E1E1E] hover:text-[#D88770]"
          onClick={() => navigate("/wishlist")}
        >
          <FaHeart size={20} />
          <span className="text-xs mt-1">Wishlist</span>
        </button>

        <button
  className="flex flex-col items-center text-[#1E1E1E] hover:text-[#D88770]"
  onClick={() => navigate("/cart")}
>
  <div className="relative">
    <FaShoppingBag size={20} />

    {cartCount > 0 && (
      <span
        className="
          absolute
          -top-2
          -right-3
          bg-[#D88770]
          text-white
          text-[10px]
          min-w-[18px]
          h-[18px]
          rounded-full
          flex
          items-center
          justify-center
          font-semibold
        "
      >
        {cartCount}
      </span>
    )}
  </div>

  <span className="text-xs mt-1">Cart</span>
</button>

        <button
          className="flex flex-col items-center text-[#1E1E1E] hover:text-[#D88770]"
          onClick={() => navigate("/contact")}
        >
          <FaPhoneAlt size={20} />
          <span className="text-xs mt-1">Contact</span>
        </button>
      </div>
    </nav>
  );
}

export default Nav;