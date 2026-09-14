import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { authDataContext } from "../context/AuthContext";

function AdminOrders() {
  const navigate = useNavigate();

  const { serverUrl } = useContext(authDataContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const result = await axios.get(
        serverUrl + "/api/order/all",
        {
          withCredentials: true,
        }
      );

      if (result.data.success) {
        setOrders(result.data.orders);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    orderId,
    status
  ) => {
    try {
      const result = await axios.put(
        serverUrl + "/api/order/status",
        {
          orderId,
          status,
        },
        {
          withCredentials: true,
        }
      );

      if (result.data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? { ...order, status }
              : order
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F4]">

      {/* Back Button */}

      <div className="sticky top-0 z-50 bg-[#FFF8F4] p-4">
        <button
          onClick={() => navigate("/")}
          className="
            flex items-center gap-2
            bg-white
            border
            border-[#E8DED8]
            px-4 py-2
            rounded-xl
            shadow-sm
            hover:bg-[#FFF4F0]
            transition
          "
        >
          ← Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-10">

        <h1 className="text-3xl md:text-4xl font-bold text-[#2F1E1A] mb-8">
          Orders Management
        </h1>

        {loading ? (
          <div className="text-center py-20">
            Loading Orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl text-center border border-[#E8DED8]">
            <h2 className="text-2xl font-semibold">
              No Orders Found
            </h2>
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (
              <div
                key={order._id}
                className="
                  bg-white
                  border border-[#E8DED8]
                  rounded-3xl
                  p-4 md:p-6
                  shadow-sm
                "
              >

                {/* Top Section */}

                <div className="flex flex-col xl:flex-row xl:justify-between gap-5">

                  <div>
                    <h2 className="font-bold text-xl text-[#2F1E1A]">
                      Order #{order._id.slice(-6)}
                    </h2>

                    <p className="text-gray-500 text-sm">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>

                    <div className="mt-3">
                      <p className="font-medium">
                        {order.userId?.name}
                      </p>

                      <p className="text-sm text-gray-500 break-all">
                        {order.userId?.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">

                    <span
                      className={`
                        px-3 py-1
                        rounded-full
                        text-sm
                        font-medium
                        w-fit
                        ${getStatusColor(order.status)}
                      `}
                    >
                      {order.status}
                    </span>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className="
                        border
                        border-[#E8DED8]
                        rounded-xl
                        p-3
                        bg-white
                        min-w-[220px]
                      "
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Packed">
                        Packed
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Out For Delivery">
                        Out For Delivery
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>
                    </select>

                  </div>

                </div>

                {/* Products */}

                <div className="mt-6 space-y-4">

                  {order.items?.map((item) => (
                    <div
                      key={item._id}
                      className="
                        flex flex-col
                        sm:flex-row
                        gap-4
                        border-b
                        pb-4
                      "
                    >

                      <img
                        src={item.product?.image1}
                        alt=""
                        className="
                          w-20 h-20
                          rounded-xl
                          object-cover
                          border border-[#E8DED8]
                        "
                      />

                      <div className="flex-1">

                        <p className="font-semibold text-[#2F1E1A]">
                          {item.product?.name}
                        </p>

                        <p className="text-gray-500 text-sm">
                          Quantity: {item.quantity}
                        </p>

                        {item.size && (
                          <p className="text-gray-500 text-sm">
                            Size: {item.size}
                          </p>
                        )}

                      </div>

                    </div>
                  ))}

                </div>

                {/* Bottom Info */}

                <div className="mt-6 pt-4 border-t">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                      <p className="font-semibold">
                        Address
                      </p>

                      <p className="text-gray-600 break-words">
                        {order.address}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold">
                        Phone
                      </p>

                      <p className="text-gray-600">
                        {order.phone}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold">
                        Payment Method
                      </p>

                      <p className="text-gray-600">
                        {order.paymentMethod}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold">
                        Total Amount
                      </p>

                      <p className="text-[#D88770] font-bold text-lg">
                        ₹{order.totalAmount}
                      </p>
                    </div>

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

export default AdminOrders;