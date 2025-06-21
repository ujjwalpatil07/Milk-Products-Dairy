import React, { useContext, useEffect, useState } from "react";
import { FaHourglassHalf, FaBoxOpen, FaShippingFast, FaCheckCircle, FaTimesCircle, FaMoneyBillWave, FaGlassWhiskey } from "react-icons/fa";
import { getUserOrders } from "../../services/orderService";
import { UserAuthContext } from "../../context/AuthProvider";

export default function MyOrders() {
  const { authUser } = useContext(UserAuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (authUser?._id) {
          const res = await getUserOrders(authUser._id);
          setOrders((res.orders || []).reverse());
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Something went wrong while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authUser?._id]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <FaHourglassHalf className="text-yellow-500" />;
      case "Processing":
        return <FaBoxOpen className="text-blue-500" />;
      case "Shipped":
        return <FaShippingFast className="text-purple-500" />;
      case "Delivered":
        return <FaCheckCircle className="text-green-600" />;
      case "Cancelled":
        return <FaTimesCircle className="text-red-500" />;
      case "Confirmed":
        return <FaCheckCircle className="text-blue-500" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500 min-w-xl space-x-2">
        <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-[#843E71]"></div>
        <p className="text-sm">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-6">{error}</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-300 py-16">
        You haven't placed any orders yet.
      </div>
    );
  }

  return (
    <div className="w-full h-fit md:w-xl lg:w-2xl bg-white dark:bg-gray-500/20 text-gray-800 dark:text-white md:p-3 rounded-md shadow">
      <h2 className="text-2xl font-bold mb-3 py-3 text-center">My Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-100 dark:bg-gray-500/10 md:rounded-lg p-3 md:p-5 shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                {getStatusIcon(order.status)}
                <span className="font-semibold text-lg">{order.status}</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-300">
                {new Date(order.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>

            <div className="overflow-x-auto mb-3">
              <table className="w-full overflow-x-auto text-sm text-left">
                <thead className="bg-gray-200 dark:bg-gray-600">
                  <tr>
                    <th className="p-2 md:px-4 md:py-2 border-e border-gray-500 font-semibold hidden sm:flex">Image</th>
                    <th className="p-2 md:px-4 md:py-2 border-e border-gray-500 font-semibold">Product</th>
                    <th className="p-2 md:px-4 md:py-2 border-e border-gray-500 font-semibold">Quantity</th>
                    <th className="p-2 md:px-4 md:py-2 border-e border-gray-500 font-semibold">Price</th>
                    <th className="p-2 md:px-4 md:py-2 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.productsData.map((product, idx) => (
                    <tr
                      key={idx * 0.5}
                      className="border-b border-gray-200 dark:border-gray-600"
                    >
                      <td className="p-2 hidden sm:flex w-12 h-12">
                        {product.productId?.image?.[0] ? (
                          <img
                            src={product.productId.image[0]}
                            alt={product.productId?.name || "Product"}
                            className="rounded object-cover"
                          />
                        ) : (
                          <div className="bg-black/20 w-full h-full rounded flex justify-center items-center"><FaGlassWhiskey className="text-sm text-gray-500" /></div>
                        )}
                      </td>
                      <td className="p-2 md:px-4 md:py-2 break-words">{product.productId?.name}</td>
                      <td className="p-2 md:px-4 md:py-2 break-words">{product.productQuantity}</td>
                      <td className="p-2 md:px-4 md:py-2 break-words">&#8377;{product.productPrice} / {product.productId?.quantityUnit}</td>
                      <td className="p-2 md:px-4 md:py-2 font-semibold text-gray-700 dark:text-white break-words">
                        &#8377;{product.productQuantity * product.productPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 text-sm">
              <h4 className="font-semibold mb-1 text-gray-700 dark:text-white">Delivery Address:</h4>
              <p>{order.address?.name}, {order.address?.phone}</p>
              <p className="text-gray-600 dark:text-gray-300">
                {order.address?.streetAddress}, {order.address?.city}, {order.address?.state} - {order.address?.pincode}
              </p>
              <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded">
                {order.address?.addressType}
              </span>
            </div>

            <div className="flex justify-between items-center mt-4 border-t pt-3">
              <p className="font-semibold text-sm text-gray-700 dark:text-gray-200 flex items-center gap-2">
                <FaMoneyBillWave className="text-green-500" /> Payment Mode: {order.paymentMode}
              </p>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                &#8377;{order.totalAmount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
