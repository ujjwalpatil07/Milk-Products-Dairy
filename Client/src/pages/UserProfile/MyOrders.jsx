import React, { useContext, useEffect, useState } from "react";
import { MenuItem, Button, Menu, Badge } from "@mui/material";
import { FaHourglassHalf, FaBoxOpen, FaShippingFast, FaCheckCircle, FaTimesCircle, FaMoneyBillWave, FaGlassWhiskey } from "react-icons/fa";
import { getUserOrders } from "../../services/orderService";
import { UserAuthContext } from "../../context/AuthProvider";

export default function MyOrders() {
  const { authUser } = useContext(UserAuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const orderStats = {
    Pending: 0,
    Processing: 0,
    Shipped: 0,
    Delivered: 0,
    Cancelled: 0,
    Confirmed: 0,
  };

  orders.forEach(order => {
    if (orderStats[order.status] !== undefined) {
      orderStats[order.status]++;
    }
  });

  const statCards = [
    { title: "All", count: orders.length, color: "bg-gray-600", icon: <FaGlassWhiskey /> },
    { title: "Confirmed", count: orderStats.Confirmed, color: "bg-blue-600", icon: <FaCheckCircle /> },
    { title: "Pending", count: orderStats.Pending, color: "bg-yellow-500", icon: <FaHourglassHalf /> },
    { title: "Processing", count: orderStats.Processing, color: "bg-blue-400", icon: <FaBoxOpen /> },
    { title: "Shipped", count: orderStats.Shipped, color: "bg-purple-500", icon: <FaShippingFast /> },
    { title: "Delivered", count: orderStats.Delivered, color: "bg-green-600", icon: <FaCheckCircle /> },
    { title: "Cancelled", count: orderStats.Cancelled, color: "bg-red-500", icon: <FaTimesCircle /> },
  ];

  const [selectedStatus, setSelectedStatus] = useState(statCards[0]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (card) => {
    setSelectedStatus(card);
    handleClose();
  };

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

  const filteredOrders = (selectedStatus.title === "All")
    ? orders
    : orders.filter((order) => order.status === selectedStatus.title);

  let content;
  if (loading) {
    content = (
      <div className="flex items-center justify-center py-20 text-gray-500 max-sm:max-w-xl min-w-xl space-x-2">
        <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-[#843E71]"></div>
        <p className="text-sm">Loading...</p>
      </div>
    );
  } else if (!filteredOrders || filteredOrders.length === 0) {
    content = (
      <div className="text-center text-gray-600 dark:text-gray-300 py-16 w-full">
        You haven't placed any orders yet.
      </div>
    );
  } else {
    content = (
      <div className="space-y-6">
        {filteredOrders.map((order) => (
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

            <div className="flex flex-row flex-wrap justify-between items-center gap-3 mt-4 border-t pt-3">
              <p className="font-semibold text-sm text-gray-700 dark:text-gray-200 flex items-center gap-2">
                <FaMoneyBillWave className="text-green-500" /> Payment Mode: {order.paymentMode}
              </p>

              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                &#8377;{order.totalAmount}
              </p>

              {order.status === "Confirmed" && (
                <a
                  href={`http://localhost:9000/pdf/generate-bill/${order?._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-fit px-4 py-1.5 text-sm font-semibold rounded bg-[#843E71] hover:bg-[#843E7190] text-white inline-block text-center"
                >
                  Download Bill
                </a>
              )}

            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500 text-center mt-6">{error}</p>;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="w-full !h-fit lg:w-xl md:h-full mx-auto flex justify-between items-center mb-4 text-xl font-bold">My Orders</h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="!capitalize !rounded-md !shadow !p-0"
          >
            <div className={`flex items-center text-white rounded gap-2 px-2 py-1 ${selectedStatus.color}`} >
              {selectedStatus.icon}
              <span>{selectedStatus.title}</span>
              {selectedStatus.count}
            </div>
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}

          >
            {statCards.map((card) => (
              <MenuItem key={card.title} onClick={() => handleSelect(card)} sx={{ paddingY: "2px", paddingX: "15px" }}>
                <div
                  className={`flex items-center justify-between w-40 px-3 py-2 rounded text-white ${card.color} }`}
                >
                  <div className="flex items-center gap-2">
                    {card.icon}
                    <span className="font-medium">{card.title}</span>
                  </div>
                  <span className="text-sm font-semibold">{card.count}</span>
                </div>
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>

      {content}
    </>
  );
}


