import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CloseIcon from "@mui/icons-material/Close";
import Slide from '@mui/material/Slide';

import { CartContext } from "../context/CartProvider";
import { UserAuthContext } from "../context/AuthProvider";
import { calculateCartTotals, getCartProductDetails } from "../utils/cartUtils";
import { getProducts } from "../services/productServices";
import { placeNewOrder } from "../services/orderService";
import { getDiscountedPrice } from "../utils/helper";
import { formatNumberWithCommas } from "../utils/format";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrderCheckoutPage() {

  const { authUser, deliveryAddress } = useContext(UserAuthContext);
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await getProducts();
        if (res?.success) {
          setAllProducts(res?.products || []);
        }
      } catch (error) {
        toast.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    getAllProducts();
  }, []);

  const cartDetails = useMemo(
    () => getCartProductDetails(cartItems, allProducts),
    [cartItems, allProducts]
  );

  const { subtotal, totalAmount, totalSaving } = useMemo(() => {
    return calculateCartTotals(cartDetails);
  }, [cartDetails]);

  const handlePaymentMode = () => {
    if (!deliveryAddress) {
      toast.error("Please select a delivery address before proceeding to checkout.");
      return;
    }

    setOpen(true);
  };

  const handlePlaceOrder = async (selectedMode) => {

    setOrderLoading(true);

    try {
      const orderData = {
        address: deliveryAddress?._id,
        productsData: cartDetails.map((item) => {
          const discount = item.discount || 0;
          const discountedPrice = item.price - (item.price * discount) / 100;

          return {
            productId: item.id,
            productQuantity: item.selectedQuantity,
            productPrice: parseFloat(discountedPrice.toFixed(2)),
            productName: item.name,
          };
        }),
        paymentMode: selectedMode,
        totalAmount: totalAmount,
        userId: authUser?._id
      };

      const response = await placeNewOrder(orderData);
      if (response?.success) {
        toast.success("Order placed successfully!");
        clearCart();
        setOpen(false);
        navigate(`/my-orders`);
      } else {
        toast.error(response?.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error("An error occurred while placing the order.");
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-gray-600 dark:text-white gap-3">
        <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-[#843E71]"></div>
        <span className="text-xl">Loading product...</span>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">You're not logged in.</h2>
        <p className="text-gray-500 mb-4 dark:text-gray-300">Please log in to view your cart.</p>
        <Link to={"/login"} className="text-blue-500 hover:text-blue-600" >
          Go to Login
        </Link>
      </div>
    );
  }

  if (cartItems?.length === 0) {
    return (
      <div className="p-5 text-center flex flex-col items-center justify-center h-[300px]">
        <h2 className="text-xl font-semibold">No items to checkout</h2>
        <Link to="/products" className="mt-4 inline-block bg-[#843E71] text-white py-2 px-4 rounded hover:bg-[#843e71dd]">
          Go to Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto my-10 px-4"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mb-4 text-[#843E71] dark:text-white"
        >
          Confirm Delivery Details
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-white dark:bg-gray-500/20 rounded-lg p-4 mb-6"
        >


          {deliveryAddress ? (
            <>
              <h2 className="text-lg font-semibold mb-2">Deliver To:</h2>
              <p>
                <span className="font-medium">Name:</span>{" "}
                <span className="text-gray-500 dark:text-gray-300">
                  {deliveryAddress?.name}
                </span>
              </p>
              <p>
                Mobile No:{" "}
                <span className="text-gray-500 dark:text-gray-300">
                  {deliveryAddress?.phone || "N/A"}
                </span>
              </p>
              <p>
                Address Type:{" "}
                <span className="text-gray-500 dark:text-gray-300">
                  {deliveryAddress?.addressType || "N/A"}
                </span>
              </p>
              <p className="mb-2">
                Address:{" "}
                <span className="text-gray-500 dark:text-gray-300">
                  {deliveryAddress?.streetAddress}, {deliveryAddress?.city},{" "}
                  {deliveryAddress?.state}, {deliveryAddress?.pincode}
                </span>
              </p>
            </>
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-300">
              <p className="mb-2 pb-2">No delivery address found.</p>
              <Link
                to={"/cart"}
                className="mt-2 bg-[#843E71] text-white px-6 py-2 rounded hover:bg-[#843e71d4]"
              >
                Add Address
              </Link>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="bg-white dark:bg-gray-500/20 rounded-lg p-4"
        >
          <h2 className="text-lg font-semibold mb-3">Order Summary</h2>

          {cartDetails.map((item, idx) => {
            const { discountedPrice, saved } = getDiscountedPrice(item.price, item.discount);

            return (
              <div
                key={item.id || idx}
                className="flex justify-between py-2 border-b border-dashed border-gray-500/50"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.selectedQuantity} {item.quantityUnit} &times;{" "}
                    <span className="line-through text-gray-400 mr-1">
                      &#8377; {formatNumberWithCommas(item?.price)}
                    </span>
                    <span className="text-green-700 font-semibold">
                      &#8377; {formatNumberWithCommas(discountedPrice)}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-semibold">
                    &#8377; {formatNumberWithCommas(discountedPrice * item.selectedQuantity)}
                  </p>
                  {saved > 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Saved &#8377; {formatNumberWithCommas(saved * item.selectedQuantity)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}

          <div className="pt-4 text-sm text-gray-800 dark:text-gray-100 space-y-2 font-medium">
            <p>Total MRP: <span className="float-right text-blue-600 font-bold">&#8377;{formatNumberWithCommas(subtotal)}</span></p>
            <p>You Saved: <span className="float-right text-red-500">&#8377;{formatNumberWithCommas(totalSaving)}</span></p>
            <p className="text-lg font-bold">Final Payable: <span className="float-right text-green-600">&#8377;{formatNumberWithCommas(totalAmount)}</span></p>
          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex justify-between"
        >
          <Link
            to="/cart"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Back to Cart
          </Link>
          <button
            onClick={handlePaymentMode}
            className="bg-[#843E71] text-white px-6 py-2 rounded hover:bg-[#843e71d4]"
          >
            Place Order
          </button>
        </motion.div>
      </motion.section>

      <Dialog
        open={open}
        onClose={() => {
          if (!orderLoading) {
            setOpen(false)
          }
        }}
        slots={{
          transition: Transition,
        }}
        maxWidth="sm"
        fullWidth
      >
        <div className="bg-white dark:bg-black/80 text-gray-900 dark:text-white">

          <header className="sticky top-0 left-0 flex justify-between items-center px-4 py-3 border-b border-gray-300 dark:border-gray-600 backdrop-blur-md bg-white/70 dark:bg-gray-700/30 z-10">
            <span className="text-xl font-semibold">Choose Payment Mode</span>
            <button onClick={() => setOpen(false)} className="text-gray-600 dark:text-gray-300">
              <CloseIcon fontSize="small" />
            </button>
          </header>

          <DialogContent className="space-y-2 px-4 pt-4 pb-2">
            <p><strong>Total Items:</strong> {cartDetails.length}</p>
            <p><strong>Total MRP:</strong> &#8377; {formatNumberWithCommas(subtotal)}</p>
            <p className="text-red-500">
              <strong>You Saved:</strong> &#8377; {formatNumberWithCommas(totalSaving)}
            </p>
            <p className="text-green-600 font-bold">
              <strong>Payable Amount:</strong> &#8377; {formatNumberWithCommas(totalAmount)}
            </p>
          </DialogContent>

          <div className="px-3 pb-4 pt-2 flex justify-end space-x-3">
            <button
              disabled={orderLoading}
              onClick={() => handlePlaceOrder("Cash on Delivery")}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-2 sm:px-4 py-2 rounded shadow disabled:cursor-not-allowed"
            >
              {orderLoading ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LocalShippingIcon fontSize="small" className="!hidden sm:!flex" />
                  Cash on Delivery
                </span>
              )}
            </button>

            <button
              disabled={orderLoading}
              onClick={() => toast.info("Online payment not yet implemented")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow disabled:cursor-not-allowed"
            >
              <PaidIcon fontSize="small" className="!hidden sm:!flex" />
              Online Payment
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
