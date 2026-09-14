import express from "express";

import {
  placeOrder,
  placeOrderRazorpay,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  verifyRazorpayPayment,
} from "../controller/orderController.js";

import isAuth from "../middleware/isAuth.js";

const orderRouter = express.Router();

// Place Order
orderRouter.post("/place", isAuth, placeOrder);

// Get User Orders
orderRouter.post("/myorders", isAuth, getUserOrders);

orderRouter.get("/all", getAllOrders);

orderRouter.put("/status", updateOrderStatus);

orderRouter.post(
  "/razorpay",
  isAuth,
  placeOrderRazorpay
);

orderRouter.post(
  "/verify-razorpay",
  verifyRazorpayPayment
);
export default orderRouter;