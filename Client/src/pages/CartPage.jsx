import React, { useContext, useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { UserAuthContext } from "../context/AuthProvider"
import { CartContext } from "../context/CartProvider";
import { getCartProductDetails, calculateCartTotals } from "../utils/cartUtils";
import { getDiscountedPrice } from "../utils/helper";
import { formatNumberWithCommas } from "../utils/format";
import CartProductCard from "../components/CartComponents/CartProductCard";
import SavedAddressList from "../components/CartComponents/SavedAddressList";
import { getProducts } from "../services/productServices";
import { toast } from "react-toastify";

export default function CartPage() {

    const navigate = useNavigate();
    const { authUser, deliveryAddress } = useContext(UserAuthContext);
    const { cartItems } = useContext(CartContext);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const res = await getProducts();
                if (res?.success) {
                    setAllProducts(res.products || []);
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


    const handleDialogStatus = (status) => {
        setOpen(status);
    }

    const handleProceedCheckout = () => {
        if (!deliveryAddress) {
            toast.error("Please select a delivery address before proceeding to checkout.");
            return;
        }

        navigate("/order-checkout");
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
            <div className="px-3 py-10 text-center">
                <ShoppingCartIcon className="mx-auto text-4xl text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Could not find matching products in your cart.
                </p>
                <Link
                    to="/products"
                    className="inline-flex items-center px-4 py-2 bg-primary-500 text-blue-500 hover:text-blue-600 rounded hover:bg-primary-600 transition"
                >
                    <ArrowBackIcon className="mr-2" sx={{ fontSize: "1.3rem" }} />
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <>
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto my-5 px-3"
            >
                <div className="p-3 md:p-5 rounded-lg bg-white dark:bg-gray-500/20">
                    {deliveryAddress ? (
                        <>
                            <h1>
                                Deliver To:
                                <span className="ps-1 text-lg font-bold break-all text-[#b1338f] dark:text-[#d51ca4]">
                                    {deliveryAddress?.name}
                                </span>
                                <span className="text-sm ms-3 px-3 rounded-full bg-gray-500/10 dark:bg-gray-200/50">
                                    {deliveryAddress?.addressType}
                                </span>
                            </h1>
                            <p>
                                Mobile No:{" "}
                                <span className="text-gray-500 dark:text-gray-300">
                                    {deliveryAddress?.phone}
                                </span>
                            </p>
                            <p className="mb-2">
                                Address:{" "}
                                <span className="text-gray-500 dark:text-gray-300">
                                    {deliveryAddress?.streetAddress}, {deliveryAddress?.city},{" "}
                                    {deliveryAddress?.state}, {deliveryAddress?.pincode}.
                                </span>
                            </p>
                            <div className="space-x-5 flex justify-end">
                                <button
                                    onClick={() => setOpen(true)}
                                    className="text-blue-500 hover:text-blue-600 border px-2 rounded-sm"
                                >
                                    Change
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center">
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
                                No delivery address found.
                            </h2>
                            <button
                                onClick={() => setOpen(true)}
                                className="bg-[#843E71] text-white px-6 py-2 rounded hover:bg-[#843e71d4]"
                            >
                                Add Address
                            </button>
                        </div>
                    )}
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto my-5 px-3 flex flex-wrap gap-5"
            >
                <motion.div layout className="space-y-3 w-full md:flex-1">
                    {cartDetails.map((item, idx) => (
                        <CartProductCard key={idx * 0.55} item={item} />
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-70 bg-white dark:bg-gray-500/20 rounded-lg h-fit p-3"
                >
                    <h1 className="p-2 text-2xl font-bold text-center mb-2">Price Details</h1>

                    {cartDetails.map((item, idx) => {
                        const { discountedPrice, saved } = getDiscountedPrice(item.price, item.discount);
                        const itemTotal = discountedPrice * item.selectedQuantity;
                        const itemSaved = saved * item.selectedQuantity;

                        return (
                            <div key={idx * 0.89} className="pb-2 border-b border-dashed border-gray-500/30 dark:border-gray-400/30 mb-2">
                                <p className="font-semibold text-base text-gray-800 dark:text-white">{item.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {item.selectedQuantity} {item.quantityUnit} x {" "}
                                    <span className="line-through text-gray-400 mr-1 pe-1">
                                        &#8377;{formatNumberWithCommas(item.price)}
                                    </span>
                                    <span className="text-blue-600 font-semibold">
                                        &#8377;{formatNumberWithCommas(discountedPrice)}
                                    </span>
                                </p>
                                <div className="flex justify-between">
                                    <span className="text-green-600 font-bold">
                                        Total: &#8377;{formatNumberWithCommas(itemTotal)}
                                    </span>
                                    {saved > 0 && (
                                        <span className="text-sm text-red-500">
                                            Saved &#8377;{formatNumberWithCommas(itemSaved)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    <div className="space-y-1 font-medium">
                        <p className="text-gray-800 dark:text-gray-100">
                            Total MRP:
                            <span className="ml-1 text-blue-600 font-bold">&#8377;{formatNumberWithCommas(subtotal)}</span>
                        </p>

                        <p className="text-red-600">
                            You Saved:
                            <span className="ml-1 font-bold">&#8377;{formatNumberWithCommas(totalSaving)}</span>
                        </p>

                        <p className="text-lg font-bold text-green-700 dark:text-green-400">
                            Final Total:
                            <span className="ml-1">&#8377;{formatNumberWithCommas(totalAmount)}</span>
                        </p>
                    </div>

                    <div className="pt-10">
                        <button
                            onClick={handleProceedCheckout}
                            className="block w-full text-center bg-[#843E71] text-white py-2 rounded-md hover:bg-[#843e71d4] transition"
                        >
                            Proceed to Checkout
                        </button>
                    </div>

                </motion.div>
            </motion.section >

            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-4xl mx-auto my-10 px-3 flex justify-center"
            >
                <Link
                    to="/products"
                    className="w-fit text-center bg-[#843E71] text-white py-2 px-3 rounded-md hover:bg-[#843e71d4] transition"
                >
                    Add More Products
                </Link>
            </motion.section>

            <SavedAddressList open={open} handleDialogStatus={handleDialogStatus} />
        </>
    )
}