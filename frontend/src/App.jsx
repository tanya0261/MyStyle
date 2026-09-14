import React, { useContext } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Collections from "./pages/Collections";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import NotFound from "./pages/NotFound";

import Nav from "./component/Nav";

import { userDataContext } from "./context/UserContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Ai from "./component/Ai";

function App() {
  const { userData } = useContext(userDataContext);
  const location = useLocation();

  return (
    <>
      <Nav />

      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={
            userData ? (
              <Navigate to="/" />
            ) : (
              <Login />
            )
          }
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={
            userData ? (
              <Navigate to="/" />
            ) : (
              <Registration />
            )
          }
        />

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<Product />} />
        <Route
          path="/productdetails/:productId"
          element={<ProductDetails />}
        />

        {/* Protected Pages */}

        <Route
          path="/cart"
          element={
            userData ? (
              <Cart />
            ) : (
              <Navigate
                to="/login"
                state={{ from: location.pathname }}
              />
            )
          }
        />

        <Route
          path="/wishlist"
          element={
            userData ? (
              <Wishlist />
            ) : (
              <Navigate
                to="/login"
                state={{ from: location.pathname }}
              />
            )
          }
        />

        <Route
          path="/placeorder"
          element={
            userData ? (
              <PlaceOrder />
            ) : (
              <Navigate
                to="/login"
                state={{ from: location.pathname }}
              />
            )
          }
        />

        <Route
          path="/orders"
          element={
            userData ? (
              <Order />
            ) : (
              <Navigate
                to="/login"
                state={{ from: location.pathname }}
              />
            )
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <Ai/>
    </>
  );
}

export default App;