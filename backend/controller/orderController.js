import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import crypto from "crypto";
import razorpayInstance from "../config/razorpay.js";

export const placeOrder = async (req, res) => {
  try {
    const {
      userId,
      address,
      phone,
      totalAmount,
      paymentMethod,
    } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const order = await Order.create({
      userId,
      items: user.cart,
      address,
      phone,
      totalAmount,
      paymentMethod: paymentMethod || "COD",
      paymentStatus:
        paymentMethod === "COD"
          ? "Pending"
          : "Pending",
      status: "Pending",
    });

    // Clear cart after order
    user.cart = [];
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    console.log("PLACE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const orders = await Order.find({
      userId,
    })
      .populate({
        path: "items.product",
      })
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders,
    });

  } catch (error) {
    console.log("GET ORDERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("userId")
      .populate("items.product")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders,
    });

  } catch (error) {
    console.log("GET ALL ORDERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // Validation
    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: "Order ID and status are required",
      });
    }

    const validStatuses = [
      "Pending",
      "Packed",
      "Shipped",
      "Out For Delivery",
      "Delivered",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { status },
  {
    returnDocument: "after",
  }
);

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });

  } catch (error) {
    console.log("UPDATE ORDER STATUS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const placeOrderRazorpay = async (req, res) => {
  console.log("RAZORPAY ROUTE HIT");
    console.log(req.body);

  try {
    const {
      userId,
      address,
      phone,
      totalAmount,
    } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Create order in DB
    let order = await Order.create({
  userId,
  items: user.cart,
  address,
  phone,
  totalAmount,
  paymentMethod: "Razorpay",
  paymentStatus: "Pending",
  status: "Pending",
});
    // Create Razorpay Order
    const razorpayOrder =
    await razorpayInstance.orders.create({
    amount: totalAmount * 100,
    currency: "INR",
    receipt: order._id.toString(),
    });

      order.razorpayOrderId = razorpayOrder.id;

      await order.save();
      order.razorpayOrderId = razorpayOrder.id;
      await order.save();
      console.log("RAZORPAY ORDER CREATED:");
      console.log(razorpayOrder);


    return res.status(200).json({
      success: true,
      order,
      razorpayOrder,
    });

  } catch (error) {
    console.log("RAZORPAY ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  console.log("VERIFY ROUTE HIT");
    console.log(req.body);

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const sign = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        razorpay_order_id +
          "|" +
          razorpay_payment_id
      )
      .digest("hex");
       console.log("Generated Signature:", sign);
console.log("Received Signature:", razorpay_signature);
    if (sign !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid Signature",
      });
    }

    const order = await Order.findOne({
      razorpayOrderId: razorpay_order_id,
    });
   console.log("Found Order:", order);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.paymentStatus = "Paid";
    order.razorpayPaymentId =
      razorpay_payment_id;

    await order.save();
    await User.findByIdAndUpdate(
  order.userId,
  {
    cart: [],
  }
);
    return res.json({
      success: true,
      message: "Payment Verified",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};