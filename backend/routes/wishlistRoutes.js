import express from "express";

import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  checkWishlist,
} from "../controller/wishlistController.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/add", addToWishlist);

wishlistRouter.post("/get", getWishlist);

wishlistRouter.post("/remove", removeFromWishlist);

wishlistRouter.post("/check", checkWishlist);

export default wishlistRouter;