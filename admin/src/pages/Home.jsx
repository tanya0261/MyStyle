import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";

import { authDataContext } from "../context/AuthContext";

function Home() {
  const { serverUrl } = useContext(authDataContext);

  const [showSidebar, setShowSidebar] =
    useState(false);

  const [dashboard, setDashboard] = useState({
    totalOrders: 0,
    totalProducts: 0,
    pendingOrders: 0,
    revenue: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const result = await axios.get(
        serverUrl + "/api/dashboard"
      );

      setDashboard(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8F4]">

      <Nav />

      {/* Mobile Sidebar Drawer */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 flex">

          <div className="w-72 bg-white h-full shadow-xl overflow-y-auto">

            <div className="flex justify-between items-center p-4 border-b">

              <h2 className="font-bold text-xl text-[#2F1E1A]">
                Menu
              </h2>

              <button
                onClick={() =>
                  setShowSidebar(false)
                }
                className="text-2xl"
              >
                ✕
              </button>

            </div>

            <Sidebar />

          </div>

          <div
            className="flex-1 bg-black/40"
            onClick={() =>
              setShowSidebar(false)
            }
          />

        </div>
      )}

      <div className="flex">

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 md:p-8">

          {/* Mobile Menu Button */}
          <button
            onClick={() =>
              setShowSidebar(true)
            }
            className="
              lg:hidden
              mb-5
              bg-white
              border
              border-[#E8DED8]
              px-4
              py-3
              rounded-xl
              shadow-sm
              flex
              items-center
              gap-2
            "
          >
            ☰ Menu
          </button>

          {/* Heading */}
          <div className="mb-6">

            <h1 className="text-3xl md:text-4xl font-bold text-[#2F1E1A]">
              Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome back to your admin panel
            </p>

          </div>

          {/* Stats Cards */}
          <div
            className="
              grid
              grid-cols-2
              lg:grid-cols-4
              gap-4
              lg:gap-6
            "
          >

            <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-[#E8DED8]">
              <h3 className="text-gray-500 text-sm md:text-base">
                Total Orders
              </h3>

              <p className="text-3xl md:text-4xl font-bold text-[#2F1E1A] mt-3">
                {dashboard.totalOrders}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-[#E8DED8]">
              <h3 className="text-gray-500 text-sm md:text-base">
                Products
              </h3>

              <p className="text-3xl md:text-4xl font-bold text-[#2F1E1A] mt-3">
                {dashboard.totalProducts}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-[#E8DED8]">
              <h3 className="text-gray-500 text-sm md:text-base">
                Revenue
              </h3>

              <p className="text-2xl md:text-4xl font-bold text-[#2F1E1A] mt-3 break-words">
                ₹{dashboard.revenue}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-[#E8DED8]">
              <h3 className="text-gray-500 text-sm md:text-base">
                Pending Orders
              </h3>

              <p className="text-3xl md:text-4xl font-bold text-[#D88770] mt-3">
                {dashboard.pendingOrders}
              </p>
            </div>

          </div>

          {/* Welcome Section */}
          <div className="mt-8 bg-white rounded-3xl border border-[#E8DED8] p-6">

            <h2 className="text-xl md:text-3xl font-semibold text-[#2F1E1A] mb-4">
              Welcome to My Style Admin
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Manage products, view customer
              orders, track revenue, monitor
              store activity, update order
              statuses and grow your luxury
              fashion business from one place.
            </p>

          </div>

          {/* Extra Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <div className="bg-white rounded-3xl border border-[#E8DED8] p-6">
              <h3 className="font-semibold text-xl mb-3">
                Store Status
              </h3>

              <p className="text-gray-600">
                Your store is active and
                accepting orders.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#E8DED8] p-6">
              <h3 className="font-semibold text-xl mb-3">
                Recent Activity
              </h3>

              <p className="text-gray-600">
                Monitor products, orders and
                revenue in real time.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;