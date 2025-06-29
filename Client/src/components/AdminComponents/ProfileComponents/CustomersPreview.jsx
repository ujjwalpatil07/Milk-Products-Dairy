import React from "react";
import { EyeIcon, UserCircleIcon } from "lucide-react";

const recentCustomers = [
  {
    id: "CUST001",
    name: "Rahul Sharma",
    phone: "9876543210",
    email: "rahul@gmail.com",
    joinedAt: "2024-12-20T09:30:00Z",
    totalOrders: 5,
  },
  {
    id: "CUST002",
    name: "Sneha Patil",
    phone: "9123456789",
    email: "sneha@yahoo.com",
    joinedAt: "2025-01-05T14:20:00Z",
    totalOrders: 3,
  },
  {
    id: "CUST003",
    name: "Amit Joshi",
    phone: "9988776655",
    email: "amit@gmail.com",
    joinedAt: "2025-03-12T10:45:00Z",
    totalOrders: 8,
  },
];

export default function CustomersPreview() {
  return (
    <div className="bg-white dark:bg-gray-500/20 p-5 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        👥 Recent Customers
      </h2>

      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700">
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Joined</th>
              <th className="px-3 py-2">Total Orders</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentCustomers.map((cust) => (
              <tr
                key={cust.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30"
              >
                <td className="px-3 py-2 font-medium flex items-center gap-2 text-purple-600 dark:text-purple-600/80">
                  <UserCircleIcon size={18} /> {cust.name}
                </td>
                <td className="px-3 py-2">{cust.phone}</td>
                <td className="px-3 py-2">{cust.email}</td>
                <td className="px-3 py-2">
                  {new Date(cust.joinedAt).toLocaleDateString()}
                </td>
                <td className="px-3 py-2 font-semibold text-gray-800 dark:text-white">
                  {cust.totalOrders}
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
