import React, { useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDebounce } from "use-debounce";
import { useSnackbar } from "notistack";

import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { AdminAuthContext } from "../../../context/AuthProvider";
import { SidebarContext } from "../../../context/SidebarProvider";
import { filterOrdersBySearch } from "../../../utils/filterOrders";
import { socket } from "../../../socket/socket";

export default function OrderDetails({ allOrders, loading }) {

  const { enqueueSnackbar } = useSnackbar();
  const { navbarInput, highlightMatch } = useContext(SidebarContext);
  const { authAdmin } = useContext(AdminAuthContext);
  const [statusFilter, setStatusFilter] = useState("All");
  const [debouncedSearchText] = useDebounce(navbarInput, 300);
  const [localOrders, setLocalOrders] = useState([]);
  const [processingId, setProcessingId] = useState(null);
  const [sortOption, setSortOption] = useState("latest");


  useEffect(() => {
    setLocalOrders(allOrders);
  }, [allOrders]);

  const handleOrderUpdateFailed = useCallback(({ message, status }) => {
    const action = status === "Cancelled" ? "cancel" : "accept";
    enqueueSnackbar(message || `Failed to ${action} order.`, { variant: "error" });
    setProcessingId(null);
  }, [enqueueSnackbar]);

  const handleOrderUpdateSuccess = useCallback(({ message, status }) => {
    const action = status === "Cancelled" ? "cancelled" : "accepted";
    enqueueSnackbar(message || `Order ${action} successfully.`, { variant: "success" });
    setProcessingId(null);
  }, [enqueueSnackbar]);

  useEffect(() => {
    socket.on("order:update-status-failed", handleOrderUpdateFailed);
    socket.on("order:update-status-success", handleOrderUpdateSuccess);

    return () => {
      socket.off("order:update-status-failed", handleOrderUpdateFailed);
      socket.off("order:update-status-success", handleOrderUpdateSuccess);
    };
  }, [handleOrderUpdateFailed, handleOrderUpdateSuccess]);

  const handleAcceptOrders = async (orderId, userId) => {

    if (!authAdmin?._id) {
      enqueueSnackbar("Unauthorized: Please login as admin.", { variant: "error" });
      return;
    }

    if (!orderId) {
      enqueueSnackbar("Invalid order ID.", { variant: "error" });
      return;
    }

    if (!userId) {
      enqueueSnackbar("Invalid user ID.", { variant: "error" });
      return;
    }

    setProcessingId({ orderId, status: "Accept" });

    socket.emit("order:accept", {
      orderId,
      status: "Confirmed",
      userId,
      date: new Date().toISOString(),
    });
  };

  const handleRejectOrders = async (orderId, userId) => {

    if (!authAdmin?._id) {
      enqueueSnackbar("Unauthorized: Please login as admin.", { variant: "error" });
      return;
    }

    if (!orderId) {
      enqueueSnackbar("Invalid order ID.", { variant: "error" });
      return;
    }

    if (!userId) {
      enqueueSnackbar("Invalid user ID.", { variant: "error" });
      return;
    }

    setProcessingId({ orderId, status: "Reject" });

    socket.emit("order:reject", {
      orderId,
      userId,
      status: "Cancelled",
      date: new Date().toISOString(),
    });
  };

  const handleSortOrders = useCallback(() => {
    const sorted = [...allOrders];
    if (sortOption === "latest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === "amountHigh") {
      sorted.sort((a, b) => b.totalAmount - a.totalAmount);
    } else if (sortOption === "amountLow") {
      sorted.sort((a, b) => a.totalAmount - b.totalAmount);
    }
    setLocalOrders(sorted);
  }, [allOrders, sortOption]);

  useEffect(() => {
    handleSortOrders();
  }, [allOrders, handleSortOrders]);

  const filteredOrders = filterOrdersBySearch(localOrders, debouncedSearchText);
  const statusFilteredOrders =
    statusFilter === "All"
      ? filteredOrders
      : filteredOrders.filter((order) => order.status === statusFilter);

  const filterOptions = [
    { value: "latest", label: "Order Date: Newest First" },
    { value: "oldest", label: "Order Date: Oldest First" },
    { value: "amountHigh", label: "Total Amount: High to Low" },
    { value: "amountLow", label: "Total Amount: Low to High" },
  ];

  let content;
  if (loading) {
    content = (
      <div className="flex items-center justify-center h-[50vh] text-gray-600 dark:text-white gap-3">
        <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-[#843E71]"></div>
        <span className="text-xl">Loading orders...</span>
      </div>
    );
  } else if (statusFilteredOrders?.length === 0) {
    content = (
      <div className="text-center text-gray-500 dark:text-gray-300 py-4">
        No orders found.
      </div>
    );
  } else {


    content = statusFilteredOrders.map((order) => {
      const address = order?.address;
      const owner = address?.owner;
      const products = order?.productsData;

      const getStatusBadgeClass = (status) => {
        switch (status) {
          case "Pending":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-300";
          case "Confirmed":
            return "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300";
          case "Cancelled":
            return "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-300";
          default:
            return "bg-gray-200 text-gray-800 dark:bg-gray-700/20 dark:text-gray-300";
        }
      };
      

      return (
        <div
          key={order._id}
          className="relative bg-gray-100 dark:bg-gray-500/10 text-gray-800 dark:text-white rounded-lg p-3 md:p-6 shadow-lg w-full max-w-6xl mx-auto space-y-3"
        >

          <div className="absolute top-3 right-3 text-right">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusBadgeClass(order?.status)}`}
            >
 
              {order?.status}
            </span>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              {new Date(order?.createdAt).toLocaleString()}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={owner?.photo}
                alt={owner?.firstName}
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <p className="font-semibold">
                  {highlightMatch(owner?.firstName, navbarInput)} {highlightMatch(owner?.lastName, navbarInput)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {owner?.mobileNo}
                </p>
              </div>
            </div>

          </div>

          <div>
            <h3 className="font-semibold">Delivery Details</h3>
            <p><strong>Name:</strong> {address?.name}</p>
            <p><strong>Phone:</strong> {address?.phone}</p>
            <p><strong>Address:</strong> {highlightMatch(address?.streetAddress, navbarInput)}</p>
          </div>

          <div className="overflow-x-auto scrollbar-hide">
            <h3 className="font-semibold mb-2">Order Products</h3>
            <table className="min-w-[600px] w-full text-sm">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
                  <th className="p-2 text-left">Product ID</th>
                  <th className="p-2 text-left">Product</th>
                  <th className="p-2 text-left">Quantity</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, idx) => (
                  <tr key={idx * 0.9} className="border-b border-gray-300 dark:border-gray-700">
                    <td className="p-2">{product?.productId?._id}</td>
                    <td className="p-2">{product?.productId?.name}</td>
                    <td className="p-2">{product?.productQuantity}</td>
                    <td className="p-2">&#8377;{product?.productPrice}</td>
                    <td className="p-2">
                      &#8377;{product?.productQuantity * product?.productPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4">
            <div className="text-lg font-semibold">
              Total Amount: &#8377;{order?.totalAmount}
            </div>
            {order?.status === "Pending" ? (
              <div className="space-x-4">
                <button
                  onClick={() => handleAcceptOrders(order?._id, owner?._id)}
                  disabled={!!processingId}
                  className={`px-3 py-1 rounded transition text-white disabled:cursor-not-allowed ${processingId?.orderId === order?._id
                    ? "bg-green-600/50 dark:bg-green-700/40"
                    : "bg-green-600 dark:bg-green-700/50"
                    }`}
                >
                  {(processingId?.orderId === order?._id && processingId?.status === "Accept")
                    ? "Accepting..."
                    : "Accept"}
                </button>

                <button
                  onClick={() => handleRejectOrders(order?._id, owner?._id)}
                  disabled={!!processingId}
                  className={`px-3 py-1 rounded transition text-white disabled:cursor-not-allowed ${processingId?.orderId === order._id
                    ? "bg-red-600/50 dark:bg-red-700/40"
                    : "bg-red-600 dark:bg-red-700/50"
                    }`}
                >
                  {(processingId?.orderId === order._id && processingId?.status === "Reject")
                    ? "Rejecting..."
                    : "Reject"}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      );
    });
  }

  return (
    <div className="bg-white dark:bg-gray-500/20 rounded-lg p-4 shadow-md w-full overflow-x-auto flex flex-col gap-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-300 dark:border-gray-700 pb-4">

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <ReceiptLongOutlinedIcon className="text-[#843E71]" />
          Orders Section
        </h2>
        <div>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="rounded-md px-3 py-2 text-sm bg-gray-200 dark:bg-gray-500/10 text-black dark:text-white"
          >
            {filterOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="dark:bg-black/50">{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-sm font-medium text-gray-600 dark:text-white mb-4">
        {["All", "Pending", "Confirmed", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-full transition-all duration-200
        ${statusFilter === status
                ? "bg-[#843E71] text-white shadow"
                : "bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white"}
      `}
          >
            {status}
          </button>
        ))}
      </div>


      {content}
    </div>
  );

}

OrderDetails.propTypes = {
  orders: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
