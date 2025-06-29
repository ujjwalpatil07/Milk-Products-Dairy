import React from "react";
import { EyeIcon } from "lucide-react";

const recentOrders = [
  {
    orderId: "ORD-1234",
    customerName: "Rahul Sharma",
    date: "2025-06-23T10:45:00Z",
    items: 3,
    total: 250,
    status: "Delivered",
  },
  {
    orderId: "ORD-1233",
    customerName: "Sneha Patil",
    date: "2025-06-22T15:20:00Z",
    items: 5,
    total: 480,
    status: "Pending",
  },
  {
    orderId: "ORD-1232",
    customerName: "Amit Joshi",
    date: "2025-06-21T09:10:00Z",
    items: 2,
    total: 160,
    status: "Canceled",
  },
];

const statusColors = {
  Delivered: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Canceled: "bg-red-100 text-red-700",
};

export default function OrdersPreview() {
  return (
    <div className="bg-white dark:bg-gray-500/20 p-5 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        📦 Recent Orders Overview
      </h2>

      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700">
              <th className="px-3 py-2">Order ID</th>
              <th className="px-3 py-2">Customer</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Items</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30"
              >
                <td className="px-3 py-2 font-medium text-green-600 dark:text-green-500/50">{order.orderId}</td>
                <td className="px-3 py-2">{order.customerName}</td>
                <td className="px-3 py-2">
                  {new Date(order.date).toLocaleString()}
                </td>
                <td className="px-3 py-2">{order.items}</td>
                <td className="px-3 py-2 font-semibold">₹{order.total}</td>
                <td className="px-3 py-2">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <button className="flex items-center text-blue-600 hover:underline">
                    <EyeIcon size={16} className="mr-1" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
