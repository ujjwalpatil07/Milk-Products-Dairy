import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CartContext } from "../context/CartProvider";
import { UserAuthContext } from "../context/AuthProvider";
import { getCartProductDetails } from "../utils/cartUtils";
import { getProducts } from "../services/productServices";
import { toast } from "react-toastify";

export default function OrderCheckoutPage() {

  const { authUser, deliveryAddress } = useContext(UserAuthContext);
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);

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

  const subtotal = cartDetails.reduce((acc, item) => acc + item.price * item.selectedQuantity, 0);
  const discountPercent = 5;
  const discountAmount = (subtotal * discountPercent) / 100;
  const totalAmount = subtotal - discountAmount;

  const handlePlaceOrder = () => {
    clearCart();
    navigate("/order-success");
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
        <h2 className="text-lg font-semibold">Deliver To:</h2>
        <p><span className="font-medium">Name:</span> <span className="text-gray-500 dark:text-gray-300">{deliveryAddress?.name}</span></p>
        <p>Mobile No: <span className="text-gray-500 dark:text-gray-300">{deliveryAddress?.phone || "N/A"}</span></p>
        <p>Address Type: <span className="text-gray-500 dark:text-gray-300">{deliveryAddress?.addressType}</span></p>
        <p className="mb-2">Address: <span className="text-gray-500 dark:text-gray-300">{deliveryAddress?.streetAddress}, {deliveryAddress?.city}, {deliveryAddress?.state}, {deliveryAddress?.pincode}.</span></p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="bg-white dark:bg-gray-500/20 rounded-lg p-4"
      >
        <h2 className="text-lg font-semibold mb-3">Order Summary</h2>

        {cartDetails.map((item, idx) => (
          <div key={idx * 0.65} className="flex justify-between py-2 border-b border-dashed border-gray-500/50">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.selectedQuantity} {item.quantityUnit} &times; &#8377;{item.price.toFixed(2)}
              </p>
            </div>
            <p className="text-green-600 font-semibold">
              &#8377;{(item.price * item.selectedQuantity).toFixed(2)}
            </p>
          </div>
        ))}

        <div className="pt-4 text-sm text-gray-800 dark:text-gray-100 space-y-2 font-medium">
          <p>Total MRP: <span className="float-right text-blue-600 font-bold">&#8377;{subtotal.toFixed(2)}</span></p>
          <p>Discount ({discountPercent}%): <span className="float-right text-red-500">- &#8377;{discountAmount.toFixed(2)}</span></p>
          <p className="text-lg font-bold">Total Payable: <span className="float-right text-green-600">&#8377;{totalAmount.toFixed(2)}</span></p>
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
          onClick={handlePlaceOrder}
          className="bg-[#843E71] text-white px-6 py-2 rounded hover:bg-[#843e71d4]"
        >
          Place Order
        </button>
      </motion.div>
    </motion.section>
  );
}
