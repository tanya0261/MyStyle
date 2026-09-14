// controller/dashboardController.js

import Order from "../model/orderModel.js";
import Product from "../model/productModel.js";

export const getDashboardData = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const totalProducts = await Product.countDocuments();

    const pendingOrders = await Order.countDocuments({
      status: "Pending",
    });

    const orders = await Order.find({});

    const revenue = orders.reduce(
      (total, order) => total + order.totalAmount,
      0
    );

    res.status(200).json({
      success: true,
      totalOrders,
      totalProducts,
      pendingOrders,
      revenue,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};