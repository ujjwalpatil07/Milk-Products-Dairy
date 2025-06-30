import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Loader,
  Eye,
  PackageCheck,
  Clock,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export default function OrdersPreview() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const res = await axios.get("http://localhost:9000/order/recent-20");
        setOrders(res?.data?.orders || []);
      } catch (error) {
        console.error("Error fetching recent orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);

  const getStatusClass = (status) => {
    if (status === "Delivered") return "bg-green-100 text-green-700";
    if (status === "Pending") return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-700";
  };

  const getStatusIcon = (status) => {
    if (status === "Delivered") return <PackageCheck size={14} className="mr-1" />;
    if (status === "Pending") return <Clock size={14} className="mr-1" />;
    return <AlertTriangle size={14} className="mr-1 text-red-600" />;
  };

  let content;

  if (loading) {
    content = (
      <div className="flex justify-center items-center py-6">
        <Loader className="animate-spin text-purple-600 w-6 h-6" />
      </div>
    );
  } else if (orders.length === 0) {
    content = <p className="text-gray-500 text-sm">No recent orders found.</p>;
  } else {
    content = (
      <div className="overflow-x-auto scrollbar-hide w-full">
        <table className="min-w-[700px] w-full text-sm text-left text-gray-700 dark:text-white">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 text-sm">
            <tr>
              <th className="p-3 w-[15%]">Customer</th>
              <th className="p-3 w-[15%]">Date</th>
              <th className="p-3 w-[10%]">Items</th>
              <th className="p-3 w-[15%]">Amount</th>
              <th className="p-3 w-[15%]">Status</th>
              <th className="p-3 w-[10%]">Payment</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const statusClass = getStatusClass(order?.status);
              const address = order?.address;

              const paymentIcon =
                order.paymentMode === "Online" ? (
                  <span className="text-green-600 font-medium">Online</span>
                ) : (
                  <span className="text-yellow-600 font-medium">Cash</span>
                );

              return (
                <tr
                  key={order?._id}
                  className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500/10"
                >
                  <td className="p-3">{address?.name || "N/A"}</td>
                  <td className="p-3">
                    {order?.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                      : "N/A"}
                  </td>
                  <td className="p-3">{order?.productsData?.length ?? "-"}</td>
                  <td className="p-3">₹{order?.totalAmount?.toFixed(2) ?? "0.00"}</td>
                  <td className="p-3">
                    <span
                      className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${statusClass}`}
                    >
                      {getStatusIcon(order?.status)}
                      {order?.status}
                    </span>
                  </td>
                  <td className="p-3">{paymentIcon}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }


  return (
    <div className="bg-gray-100 dark:bg-gray-500/20 p-3 rounded shadow-sm w-full">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Recent Orders
      </h2>

      {content}

      <div className="mt-4">
        {orders?.length > 0 && (
          <Link
            to="/admin/orders"
            className="flex items-center gap-1 justify-end text-blue-600 hover:underline text-sm"
          >
            View More <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}
