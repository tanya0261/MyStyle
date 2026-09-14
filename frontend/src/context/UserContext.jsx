import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import axios from "axios";
import { authDataContext } from "./AuthContext";

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);

  const [cartCount, setCartCount] = useState(0);

  const { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/getcurrentuser`,
        {
          withCredentials: true,
        }
      );

      setUserData(result.data);
    } catch (error) {
      setUserData(null);

      console.log(
        error.response?.data || error.message
      );
    }
  };

  const fetchCartCount = async () => {
  try {
    if (!userData?._id) {
      setCartCount(0);
      return;
    }

    const result = await axios.post(
      `${serverUrl}/api/cart/get`,
      {
        userId: userData._id,
      }
    );

    console.log("CART RESPONSE:", result.data);
    const totalItems = result.data.cart.reduce(
     (total, item) => total + item.quantity,
     0
      );

      console.log("TOTAL ITEMS:", totalItems);

      setCartCount(totalItems);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (userData?._id) {
      fetchCartCount();
    } else {
      setCartCount(0);
    }
  }, [userData]);

  const value = {
    userData,
    setUserData,

    getCurrentUser,

    cartCount,
    setCartCount,
    fetchCartCount,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;