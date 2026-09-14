import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { authDataContext } from "./AuthContext";

export const shopDataContext = createContext();

function ShopContext({ children }) {
  const [products, setProducts] = useState([]);

  const { serverUrl } = useContext(authDataContext);

  const currency = "₹";
  const delivery_fee = 40;

  const getProducts = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/product/list`
      );

      console.log(result.data);
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (serverUrl) {
      getProducts();
    }
  }, [serverUrl]);

  const value = {
    products,
    setProducts,
    currency,
    delivery_fee,
    getProducts,
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
}

export default ShopContext;