import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";

import razorpayLogo from "../assets/razorpay.png";

function PlaceOrder() {
  const navigate = useNavigate();

  const { serverUrl } = useContext(authDataContext);

  const {
    userData,
    fetchCartCount,
  } = useContext(userDataContext);

  const [loading, setLoading] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    paymentMethod: "COD",
  });

  const fetchCart = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/cart/get",
        {
          userId: userData._id,
        }
      );

      setCartItems(result.data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData?._id) {
      fetchCart();

      setFormData((prev) => ({
        ...prev,
        name: userData.name || "",
        email: userData.email || "",
      }));
    }
  }, [userData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const shipping = cartItems.length > 0 ? 99 : 0;

  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
     console.log("PLACE ORDER CLICKED");
  console.log("Selected Payment:", formData.paymentMethod);
  try {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      toast.warning("Please fill all delivery details");
      return;
    }

    if (cartItems.length === 0) {
      toast.warning("Your cart is empty");
      return;
    }

    setLoading(true);
 console.log("Before COD Check");
    // COD ORDER
    if (formData.paymentMethod === "COD") {
      console.log("Entering Razorpay Section");
      const result = await axios.post(
        serverUrl + "/api/order/place",
        {
          userId: userData._id,
          address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}, ${formData.country}`,
          phone: formData.phone,
          totalAmount: total,
          paymentMethod: "COD",
        },
        {
          withCredentials: true,
        }
      );

      if (result.data.success) {
        setCartItems([]);
        await fetchCartCount();
        navigate("/orders");
      }
       
      return;
      
    }
    console.log("window.Razorpay =", window.Razorpay);
    // RAZORPAY ORDER
    const response = await axios.post(
      serverUrl + "/api/order/razorpay",
      {
        userId: userData._id,
        address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}, ${formData.country}`,
        phone: formData.phone,
        totalAmount: total,
      },
      {
        withCredentials: true,
      }
    );
    console.log("FULL RESPONSE:", response.data);
   console.log(
  "Razorpay Key:",
  import.meta.env.VITE_RAZORPAY_KEY_ID
);
    const { razorpayOrder, order } = response.data;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: razorpayOrder.amount,

      currency: razorpayOrder.currency,

      name: "MyStyle",

      description: "Order Payment",

      order_id: razorpayOrder.id,

      handler: async function (paymentResponse) {
     console.log(
    "PAYMENT SUCCESS RESPONSE:",
    paymentResponse
  );

  const verify = await axios.post(
    serverUrl + "/api/order/verify-razorpay",
    paymentResponse,
    {
      withCredentials: true,
    }
  );

  if (verify.data.success) {

    toast.success("Payment Successful");

    setCartItems([]);

    await fetchCartCount();

    navigate("/orders");

  } else {

    toast.warning("Payment Verification Failed");

  }
      },

      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },

      theme: {
        color: "#D88770",
      },
    };
    console.log("window.Razorpay =", window.Razorpay);
    const razorpay = new window.Razorpay(options);

    razorpay.open();
  } catch (error) {
    console.log(error);
    toast.error("Payment Failed");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-[#FDFBF9] px-4 md:px-6 lg:px-8 py-6 pb-32">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2F1E1A] mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* DELIVERY INFO */}

          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#E8DED8]">

            <h2 className="text-2xl font-semibold text-[#2F1E1A] mb-6">
              Delivery Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="border border-[#E8DED8] rounded-xl p-3 outline-none"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border border-[#E8DED8] rounded-xl p-3 outline-none"
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="sm:col-span-2 border border-[#E8DED8] rounded-xl p-3 outline-none"
              />

              <textarea
                rows="4"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street Address"
                className="sm:col-span-2 border border-[#E8DED8] rounded-xl p-3 outline-none resize-none"
              />

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="border border-[#E8DED8] rounded-xl p-3 outline-none"
              />

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="border border-[#E8DED8] rounded-xl p-3 outline-none"
              />

              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="border border-[#E8DED8] rounded-xl p-3 outline-none"
              />

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="border border-[#E8DED8] rounded-xl p-3 outline-none"
              />

            </div>

            {/* PAYMENT */}

            <div className="mt-8">

              <h3 className="text-2xl font-semibold text-[#2F1E1A] mb-5">
                Payment Method
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      paymentMethod: "COD",
                    })
                  }
                  className={`p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                    formData.paymentMethod === "COD"
                      ? "border-[#D88770] bg-[#FFF4F0]"
                      : "border-[#E8DED8]"
                  }`}
                >
                  <div>
                    <p className="font-semibold">
                      Cash On Delivery
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay after delivery
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>{
                    console.log("Razorpay selected");

                    setFormData({
                      ...formData,
                      paymentMethod: "Razorpay",
                    })
                  }}
                  className={`p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                    formData.paymentMethod ===
                    "Razorpay"
                      ? "border-[#D88770] bg-[#FFF4F0]"
                      : "border-[#E8DED8]"
                  }`}
                >
                  <img
                    src={razorpayLogo}
                    alt="Razorpay"
                    className="h-8"
                  />

                  <div>
                    <p className="font-semibold">
                      Razorpay
                    </p>

                    <p className="text-sm text-gray-500">
                      UPI • Cards • Net Banking
                    </p>
                  </div>
                </button>

              </div>
            </div>
          </div>

          {/* ORDER SUMMARY */}

          <div className="bg-white rounded-3xl p-6 border border-[#E8DED8] h-fit lg:sticky lg:top-24">

            <h2 className="text-2xl font-semibold text-[#2F1E1A] mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center gap-3"
                >
                  <div className="flex items-center gap-3">

                    <img
                      src={item.product.image1}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-lg object-cover border border-[#E8DED8]"
                    />

                    <div>
                      <p className="text-sm font-medium line-clamp-2">
                        {item.product.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                  </div>

                  <p className="font-medium">
                    ₹
                    {item.product.price *
                      item.quantity}
                  </p>
                </div>
              ))}

            </div>

            <hr className="mb-4" />

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>

              <div className="flex justify-between">
                <span>Payment</span>
                <span>
                  {formData.paymentMethod}
                </span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold text-[#2F1E1A]">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full mt-8 bg-[#D88770] text-white py-4 rounded-full hover:opacity-90 transition-all disabled:opacity-60"
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;