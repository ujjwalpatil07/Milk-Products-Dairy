import React, { useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { confirmUerOrder, rejectUserOrder } from "../../../services/orderService";
import { toast } from "react-toastify";
import { AdminAuthContext } from "../../../context/AuthProvider";
import { SidebarContext } from "../../../context/SidebarProvider";
import { filterOrdersBySearch } from "../../../utils/filterOrders";
import { useDebounce } from "use-debounce";

export default function OrderDetails({ orders, loading }) {

  const { navbarInput, highlightMatch } = useContext(SidebarContext);
  const { setAuthAdmin } = useContext(AdminAuthContext);

  const [debouncedSearchText] = useDebounce(navbarInput, 300);

  const [localOrders, setLocalOrders] = useState([]);
  const [processingId, setProcessingId] = useState(null);
  const [sortOption, setSortOption] = useState("oldest");

  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  const handleSortOrders = useCallback(() => {
    const sorted = [...orders];
    if (sortOption === "latest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === "amountHigh") {
      sorted.sort((a, b) => b.totalAmount - a.totalAmount);
    } else if (sortOption === "amountLow") {
      sorted.sort((a, b) => a.totalAmount - b.totalAmount);
    }
    setLocalOrders(sorted);
  }, [orders, sortOption]);

  useEffect(() => {
    handleSortOrders();
  }, [sortOption, orders, handleSortOrders]);

  const handleAcceptOrders = async (orderId) => {
    setProcessingId(orderId);
    const toastId = toast.loading("Accepting order...");
    try {
      const data = await confirmUerOrder(orderId, "Confirmed");
      if (data.success) {
        toast.update(toastId, { render: "Order confirmed!", type: "success", isLoading: false, autoClose: 3000 });
        setLocalOrders((prev) => prev.filter((order) => order._id !== orderId));
        setAuthAdmin((prevAdmin) => ({
          ...prevAdmin,
          pendingOrders: prevAdmin.pendingOrders.filter(
            (id) => id !== orderId && id !== orderId.toString()
          ),
        }));
      } else {
        toast.update(toastId, { render: "Failed to confirm order.", type: "error", isLoading: false, autoClose: 3000 });
      }
    } catch (error) {
      toast.update(toastId, { render: error?.response?.data?.message || "Error confirming order!", type: "error", isLoading: false, autoClose: 3000 });
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejectOrders = async (orderId) => {
    setProcessingId(orderId);
    const toastId = toast.loading("Rejecting order...");
    try {
      const data = await rejectUserOrder(orderId);

      if (data.success) {
        toast.update(toastId, { render: "Order rejected.", type: "info", isLoading: false, autoClose: 3000 });
        setLocalOrders((prev) => prev.filter((order) => order._id !== orderId));
        setAuthAdmin((prevAdmin) => ({
          ...prevAdmin,
          pendingOrders: prevAdmin.pendingOrders.filter(
            (id) => id !== orderId && id !== orderId.toString()
          ),
        }));
      } else {
        toast.update(toastId, { render: (data.error || "Failed to reject order."), type: "error", isLoading: false, autoClose: 3000 });
      }
    } catch (error) {
      toast.update(toastId, { render: (error?.response?.data?.message || "Error rejecting order."), type: "error", isLoading: false, autoClose: 3000 });
    } finally {
      setProcessingId(null);
    }
  };

  const filteredOrders = filterOrdersBySearch(localOrders, debouncedSearchText);
  
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
  } else if (filteredOrders?.length === 0) {
    content = (
      <div className="text-center text-gray-500 dark:text-gray-300 py-4">
        No orders found.
      </div>
    );
  } else {
    content = filteredOrders.map((order) => {
      const address = order?.address;
      const owner = address?.owner;
      const products = order?.productsData;

      return (
        <div
          key={order._id}
          className="bg-gray-100 dark:bg-gray-500/10 text-gray-800 dark:text-white rounded-lg p-3 md:p-6 shadow-lg w-full max-w-6xl mx-auto space-y-3"
        >
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
            <div className="text-sm text-gray-500 dark:text-gray-300">
              {new Date(order?.createdAt).toLocaleString()}
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Delivery Details</h3>
            <p><strong>Name:</strong> {address?.name}</p>
            <p><strong>Phone:</strong> {address?.phone}</p>
            <p><strong>Address:</strong> {highlightMatch(address?.streetAddress, navbarInput)}</p>
          </div>

          <div className="overflow-x-auto">
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
                    <td className="p-2">{product?.productId._id}</td>
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
            <div className="space-x-4">
              <button
                onClick={() => handleAcceptOrders(order._id)}
                disabled={processingId === order._id}
                className={`px-4 py-2 rounded transition text-white ${processingId === order._id
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
                  }`}
              >
                Accept
              </button>
              <button
                onClick={() => handleRejectOrders(order._id)}
                disabled={processingId === order._id}
                className={`px-4 py-2 rounded transition text-white ${processingId === order._id
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
                  }`}
              >
                Reject
              </button>
            </div>
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

      {content}
    </div>
  );

}

OrderDetails.propTypes = {
  orders: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
