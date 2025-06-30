import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { EyeIcon, MessageCircleMore, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarContext } from "../../../context/SidebarProvider";
import { filterCustomers } from "../../../utils/filterCustomers.js";

export default function CustomersList() {
  const { navbarInput } = useContext(SidebarContext);

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:9000/u/customers");
        setCustomers(res?.data?.customers ?? []);
      } catch (error) {
        console.error("Failed to load customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = filterCustomers(customers, navbarInput);
  const visibleCustomers = filteredCustomers?.slice(0, visibleCount) ?? [];

  let tableContent;

  if (loading) {
    tableContent = (
      <tr>
        <td colSpan="6" className="text-center py-4 text-gray-500">
          Loading...
        </td>
      </tr>
    );
  } else if (!visibleCustomers || visibleCustomers.length === 0) {
    tableContent = (
      <tr>
        <td colSpan="6" className="text-center py-4 text-gray-500">
          No customers found.
        </td>
      </tr>
    );
  } else {
    tableContent = visibleCustomers.map((cust) => (
      <tr
        key={cust?._id}
        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30"
      >
        <td className="px-3 py-2 font-medium text-purple-600 dark:text-purple-400">
          {cust?.firstName ?? ""} {cust?.lastName ?? ""}
        </td>
        <td className="px-3 py-2">{cust?.mobileNo ?? "N/A"}</td>
        <td className="px-3 py-2">{cust?.email ?? "N/A"}</td>
        <td className="px-3 py-2">{cust?.gender ?? "-"}</td>
        <td className="px-3 py-2 font-semibold text-gray-800 dark:text-white">
          {cust?.orders?.length ?? 0}
        </td>
        <td className="px-3 py-2 flex flex-nowrap gap-2">
          <button className="flex items-center gap-1 text-sm text-green-600 hover:underline">
            <MessageCircleMore size={16} /> Message
          </button>
          <Link
            to={`/admin/store/${cust?._id}/orders-history`}
            className="flex items-center gap-1 text-sm text-blue-600 hover:underline whitespace-nowrap"
          >
            <EyeIcon size={16} /> View
          </Link>
        </td>
      </tr>
    ));
  }


  return (
    <div className="bg-white dark:bg-gray-500/20 p-5 rounded shadow-sm space-y-4 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">👥 Customers</h2>
        <Link
          to="/admin/store"
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-[750px] w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700">
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Gender</th>
              <th className="px-3 py-2">Orders</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>

      {visibleCount < filteredCustomers?.length && (
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="text-sm text-purple-600 hover:underline flex items-center gap-1"
          >
            <Plus size={18} /> Load More
          </button>
        </div>
      )}
    </div>
  );
}
