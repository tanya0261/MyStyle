import express from "express";

import {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../controller/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);

cartRouter.post("/get", getCart);

cartRouter.put("/update", updateCartQuantity);

cartRouter.delete("/remove", removeFromCart);

cartRouter.delete("/clear", clearCart);

export default cartRouter;