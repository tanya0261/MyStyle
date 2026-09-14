import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";

function Order() {
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();
  const { userData } = useContext(userDataContext);

  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const fetchOrders = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/order/myorders",
        {
          userId: userData._id,
        },
        {
          withCredentials: true,
        }
      );

      setOrders(result.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  if (!userData?._id) return;

  fetchOrders();

  const interval = setInterval(() => {
    fetchOrders();
  }, 5000); // every 5 seconds

  return () => clearInterval(interval);
}, [userData]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Packed":
        return "bg-blue-100 text-blue-700";

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      case "Out For Delivery":
        return "bg-orange-100 text-orange-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      default:
        return "bg-red-100 text-red-700";
    }
  };

  const orderSteps = [
    "Pending",
    "Packed",
    "Shipped",
    "Out For Delivery",
    "Delivered",
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF9] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <button
  onClick={() => navigate(-1)}
  className="
    mb-6
    px-4
    py-2
    bg-white
    border
    border-[#E8DED8]
    rounded-xl
    hover:bg-[#FFF4F0]
    transition-all
    font-medium
  "
>
  ← Back
</button>
        <h1 className="text-4xl font-bold text-[#2F1E1A] mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl border border-[#E8DED8] text-center">
            <h2 className="text-2xl font-semibold">
              No Orders Found
            </h2>
          </div>
        ) : (
          <div className="space-y-8">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-white border border-[#E8DED8] rounded-3xl p-6"
              >

                {/* HEADER */}

                <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">

                  <div>

                    <h2 className="font-bold text-xl text-[#2F1E1A]">
                      Order #{order._id.slice(-6)}
                    </h2>

                    <p className="text-gray-500">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  <div className="text-left md:text-right">

                    <p className="font-bold text-xl">
                      ₹{order.totalAmount}
                    </p>

                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>

                  </div>

                </div>

                {/* TRACK ORDER BUTTON */}

<div className="mb-6">

  <button
    onClick={() =>
      setExpandedOrder(
        expandedOrder === order._id
          ? null
          : order._id
      )
    }
    className="
      bg-[#D88770]
      text-white
      px-5
      py-2
      rounded-xl
      hover:bg-[#c97761]
      transition-all
    "
  >
    {expandedOrder === order._id
      ? "Hide Tracking"
      : "Track Order"}
  </button>

</div>

{/* TRACKING STATUS */}
{expandedOrder === order._id && (
  <div className="mt-6 mb-8 overflow-x-auto">

    <div className="flex items-center min-w-[500px]">

      {orderSteps.map((step, index) => {
        const currentIndex =
          orderSteps.indexOf(order.status);

        const completed =
          index <= currentIndex;

        return (
          <div
            key={step}
            className="flex items-center flex-1"
          >
            <div className="flex flex-col items-center">

              {/* Dot */}
              <div
                className={`
                  w-3 h-3 md:w-5 md:h-5
                  rounded-full
                  ${
                    completed
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }
                `}
              />

              {/* Text */}
              <p
                className={`
                  mt-2
                  text-[10px] md:text-sm
                  text-center
                  w-14 md:w-24
                  ${
                    completed
                      ? "text-[#2F1E1A] font-medium"
                      : "text-gray-400"
                  }
                `}
              >
                {step}
              </p>
            </div>

            {/* Line */}
            {index !== orderSteps.length - 1 && (
              <div
                className={`
                  flex-1
                  h-[2px]
                  mx-2
                  ${
                    index < currentIndex
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }
                `}
              />
            )}
          </div>
        );
      })}

    </div>

  </div>
)}
                {/* PRODUCTS */}

                <div className="space-y-4">

                  {order.items?.map((item) => (

                    <div
                      key={item._id}
                      className="flex items-center justify-between gap-4 border-b pb-4"
                    >

                      <div className="flex items-center gap-4">

                        <img
                          src={item.product?.image1}
                          alt=""
                          className="w-16 h-16 rounded-xl object-cover border border-[#E8DED8]"
                        />

                        <div>

                          <p className="font-semibold text-[#2F1E1A]">
                            {item.product?.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>

                          {item.size && (
                            <p className="text-sm text-gray-500">
                              Size: {item.size}
                            </p>
                          )}

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

                {/* ORDER INFO */}

                <div className="mt-6 pt-4 border-t">

                  <div className="grid md:grid-cols-2 gap-3">

                    <p>
                      <span className="font-semibold">
                        Address:
                      </span>{" "}
                      {order.address}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Phone:
                      </span>{" "}
                      {order.phone}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Payment Method:
                      </span>{" "}
                      {order.paymentMethod}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Payment Status:
                      </span>{" "}
                      {order.paymentStatus}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default Order;