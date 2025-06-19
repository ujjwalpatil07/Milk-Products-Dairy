import React, { useEffect, useState, useContext } from "react";
import { UserAuthContext } from "../context/AuthProvider";
import { getUserOrders } from "../services/orderService";
import { formatNumberWithCommas } from "../utils/format";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserOrdersPage() {
  const { authUser } = useContext(UserAuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getUserOrders();
        if (res?.success) {
          setOrders(res.orders || []);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        toast.error();
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 rounded-full border-4 border-dashed border-[#843E71]"></div>
        <span className="ml-3 text-xl">Loading your orders...</span>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center p-5">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">No orders found</h2>
        <p className="text-gray-500 mt-2">You haven't placed any orders yet.</p>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="text-center p-5">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">You're not logged in.</h2>
        <p className="text-gray-500 mt-2">Please login to view your orders.</p>
        <Link to="/login" className="inline-block mt-3 bg-[#843E71] text-white px-4 py-2 rounded hover:bg-[#843e71dd]">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#843E71]">My Orders</h1>

      {orders.map((order, index) => (
        <motion.div
          key={order._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 shadow rounded-lg mb-6 p-4"
        >
          <div className="mb-2 flex justify-between items-center">
            <span className="font-semibold text-lg">Order #{order._id.slice(-6)}</span>
            <span className={`text-sm px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-2">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>

          <div className="mb-3">
            <p className="text-sm"><strong>Payment Mode:</strong> {order.paymentMode}</p>
            <p className="text-sm"><strong>Total Amount:</strong> ₹{formatNumberWithCommas(order.totalAmount)}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Products:</h3>
            {order.productsData.map((product, idx) => (
              <div key={idx} className="text-sm flex justify-between mb-1">
                <span>🛒 {product.productId?.name || "Product"} (×{product.productQuantity})</span>
                <span>₹{formatNumberWithCommas(product.productPrice)}</span>
              </div>
            ))}
          </div>

          {order.address && (
            <div className="mt-4 text-sm">
              <h4 className="font-semibold">Delivery Address:</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {order.address.streetAddress}, {order.address.city}, {order.address.state} - {order.address.pincode}
              </p>
              <p>Phone: {order.address.phone}</p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function getStatusColor(status) {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Processing":
      return "bg-blue-100 text-blue-700";
    case "Shipped":
      return "bg-purple-100 text-purple-700";
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}
