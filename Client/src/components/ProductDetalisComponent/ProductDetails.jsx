import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import { Tooltip } from "@mui/material";
import Rating from '@mui/material/Rating';
import { UserAuthContext } from "../../context/AuthProvider";
import { CartContext } from "../../context/CartProvider";
import { productLike } from "../../services/productServices";
import { getDiscountedPrice } from "../../utils/helper";
import { formatNumberWithCommas } from "../../utils/format";

export default function ProductDetails({ id, name, description, image = [], discount, minQuantity, quantityUnit, type, stock, shelfLife, avgRating, reviewsLength, nutrition, likes, price }) {

    const navigate = useNavigate();
    const { authUser } = useContext(UserAuthContext);
    const { cartItems, addToCart } = useContext(CartContext);

    const minQty = Number(minQuantity) || 1;
    const existing = cartItems?.find(item => item?.productId === id);

    const [quantity, setQuantity] = useState(0);
    const [selectedImage, setSelectedImage] = useState(image[0] || "");
    const [localLikes, setLocalLikes] = useState(likes || []);
    const [likeLoading, setLikeLoading] = useState(false);

    useEffect(() => {
        setLocalLikes(likes || []);
    }, [id, likes]);

    useEffect(() => {
        setSelectedImage(image[0]);
    }, [image]);

    const priceNumber = Number(price) || 0;
    const discountPercent = Number(discount) || 0;
    const { discountedPrice, saved } = getDiscountedPrice(priceNumber, discountPercent);


    const handleAddProduct = (productId) => {
        if (quantity <= 0) {
            toast.error("Please select quantity.");
            return;
        }
        if (quantity > stock) {
            toast.error("Stock not available!");
            return;
        }

        addToCart(productId, quantity, discountedPrice);
        setQuantity(0);
        toast.success("Product added to cart!");
    }

    const handleLikeProduct = async (productId) => {
        if (!authUser?._id) {
            toast.error("Please log in to like products.");
            return;
        }

        if (localLikes.includes(authUser._id)) {
            toast.info("You already liked this product.");
            return;
        }

        setLikeLoading(true);

        try {
            const { message, updatedLikes } = await productLike(productId, authUser._id);
            setLocalLikes(updatedLikes);
            toast.success(message || "You liked the product!");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to like product.");
        } finally {
            setLikeLoading(false);
        }
    }

    const handleBuyProductNow = (productId) => {
        if (quantity > 0) {
            handleAddProduct(productId);
        }
        navigate('/cart');
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
            >
                <div className="mb-4 md:p-5">
                    {
                        (!selectedImage || selectedImage === 'null') ? (<div className="w-full h-[200px] md:h-[400px] flex flex-col items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 rounded-xl" >
                            <EmojiFoodBeverageIcon className="text-gray-400 dark:text-gray-300 text-5xl" />
                            <span className="text-gray-500 dark:text-gray-300 text-sm font-medium hover:text-blue-500">
                                {name}
                            </span>
                        </div>) : (
                            <img
                                src={selectedImage}
                                alt="Main product"
                                className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover rounded-lg shadow"
                            />
                        )
                    }

                    {!localLikes?.includes(authUser?._id) && (
                        <button
                            onClick={() => handleLikeProduct(id)}
                            className="absolute top-4 right-4 md:top-8 md:right-8 bg-white rounded-full w-8 h-8 flex items-center justify-center text-red-500 hover:bg-white/50 dark:bg-gray-500/50 transition-colors cursor-pointer"
                            disabled={likeLoading}
                        >
                            {likeLoading ? (
                                <div className="w-4 h-4 border-2 border-t-transparent border-red-500 rounded-full animate-spin"></div>
                            ) : (
                                <FavoriteBorderIcon sx={{ fontSize: "1.3rem" }} />
                            )}
                        </button>
                    )}

                </div>

                <div className="flex justify-center gap-2 flex-wrap">
                    {image?.map((img, idx) => (
                        <button
                            key={idx * 0.8}
                            onClick={() => setSelectedImage(img)}
                            className={`w-12 h-12 md:w-16 md:h-16 border-2 rounded-md p-0 overflow-hidden ${selectedImage === img ? "border-[#843E71]" : "border-gray-300"
                                }`}
                            aria-label={`Select image ${idx + 1}`}
                        >
                            <img
                                src={img}
                                alt={`Preview ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}

                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex-1"
            >
                <h2 className="text-2xl font-bold mb-1">{name}</h2>

                <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <div className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
                        <span>Quality: </span>
                        <span>{type}</span>
                    </div>
                    <span className="border-e-2 border-gray-300 dark:border-gray-500 py-[5.2px]"></span>
                    <div className="text-yellow-500 font-semibold flex items-center gap-2">
                        <div className="dark:bg-white flex p-0.5 rounded">
                            <Rating sx={{ fontSize: "1rem" }} name="read-only" value={avgRating} readOnly />
                        </div>
                        <span>{avgRating}</span>
                        <span className="text-gray-500 dark:text-gray-300 text-sm">({reviewsLength} reviews)</span>
                    </div>
                    <span className="border-e-2 border-gray-300 dark:border-gray-500 py-[5.2px]"></span>
                    <p className="text-gray-500 dark:text-gray-300 text-sm font-semibold">
                        Shelf Life: {shelfLife}
                    </p>
                </div>

                {stock > 0 ? (
                    <div className="bg-red-600/10 text-red-500 px-2 rounded text-[14px] inline-block mb-1">
                        AVAILABILITY: ONLY {stock} {(quantityUnit || "").toUpperCase()} IN STOCK
                    </div>
                ) : (
                    <div className="text-red-600 font-semibold text-[14px] mb-1">
                        OUT OF STOCK
                    </div>
                )}

                <div className="text-green-700 dark:text-green-500 font-semibold text-sm mb-3">
                    Minimum Quantity: {minQuantity || 1} {quantityUnit}
                </div>

                <div className="border-t border-dashed border-gray-500/50 pt-2">
                    <h3 className="font-bold pb-1">Description: </h3>
                    <p className="whitespace-pre-line text-gray-500 dark:text-gray-200 text-sm line-clamp-15">{description}</p>
                </div>

                {nutrition && (
                    <div className="my-4">
                        <h3 className="font-semibold mb-1">Nutrition Facts:</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-500 dark:text-gray-200">
                            {Object.entries(nutrition).map(([key, value]) => (
                                <li key={key} className="capitalize">
                                    <span className="font-medium">{key}:</span> {value}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <br />

                {existing && (
                    <span className="text-sm text-gray-500 dark:text-gray-300">
                        In Cart: {existing?.quantity} {quantityUnit}
                    </span>
                )}

                <div className="flex items-center justify-between pt-3">
                    <div className="mb-3">
                        {discountPercent > 0 ? (
                            <>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-2xl md:text-3xl font-bold text-[#843E71]">
                                        &#8377;{formatNumberWithCommas(discountedPrice)}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-300 text-base line-through">
                                        &#8377;{formatNumberWithCommas(priceNumber)}
                                    </span>
                                    <span className="bg-green-100 dark:bg-green-800/30 text-green-700 dark:text-green-300 text-xs px-2 py-0.5 rounded-full font-semibold flex items-center">
                                        {discountPercent}% OFF
                                    </span>
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-300">
                                    You save &#8377;{formatNumberWithCommas(saved)}
                                </div>
                            </>
                        ) : (
                            <h1 className="text-2xl md:text-3xl font-bold text-[#843E71]">
                                &#8377;{formatNumberWithCommas(priceNumber)}
                            </h1>
                        )}
                    </div>


                    <div className="flex items-center gap-2">
                        <Tooltip
                            title={quantity <= 0 ? "Minimum quantity reached" : "Decrease quantity"}
                            arrow
                            placement="top"
                        >
                            <span>
                                <button
                                    onClick={() => setQuantity(prev => Math.max(0, prev - (minQty || 1)))}
                                    disabled={quantity <= 0}
                                    className="w-6 h-6 md:w-8 md:h-8 rounded-md flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 text-red-500 border-2 disabled:opacity-50"
                                >
                                    <RemoveIcon sx={{ fontSize: "1.2rem" }} />
                                </button>
                            </span>
                        </Tooltip>
                        <input
                            type="number"
                            className="hide-input-spin text-center w-17 md:text-2xl text-gray-800 dark:text-white font-semibold border-2 border-gray-300 dark:border-gray-500 rounded-lg py-1 bg-white dark:bg-gray-500/20"
                            value={quantity}
                            min={0}
                            max={Math.max(0, stock - (existing?.quantity || 0))}
                            disabled={stock <= (existing?.quantity || 0)}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                const maxQty = stock - (existing?.quantity || 0);
                                if (value <= maxQty && value >= 0) setQuantity(value);
                            }}
                        />

                        <Tooltip
                            title={
                                quantity + (existing?.quantity || 0) >= stock
                                    ? "No more stock available"
                                    : "Increase quantity"
                            }
                            arrow
                            placement="top"
                        >
                            <span>
                                <button
                                    disabled={quantity + (existing?.quantity || 0) >= stock}
                                    onClick={() => setQuantity(prev => prev + (minQty || 1))}
                                    className="w-6 h-6 md:w-8 md:h-8 rounded-md flex items-center justify-center bg-green-500/20 hover:bg-green-500/30 text-green-500 border-2 disabled:opacity-50"
                                >
                                    <AddIcon sx={{ fontSize: "1.2rem" }} />
                                </button>
                            </span>
                        </Tooltip>

                    </div>
                </div>

                <div className="py-5 grid grid-cols-2 gap-2">
                    <button
                        onClick={() => handleBuyProductNow(id)}
                        className="flex items-center justify-center gap-1 px-3 py-1.5 md:px-6 md:py-2 rounded-lg bg-[#843E71] hover:bg-[#843E71] text-white cursor-pointer"
                    >
                        <span>Buy Now</span>
                    </button>
                    <button
                        onClick={() => handleAddProduct(id)}
                        disabled={quantity === 0 || quantity > stock}
                        className="flex items-center justify-center gap-1 px-3 py-1.5 md:px-6 md:py-2 rounded-lg text-[#843E71] border hover:bg-[#843E7120] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <ShoppingCartIcon sx={{ fontSize: "1.2rem" }} />
                        <span>Add to Cart</span>
                    </button>
                </div>

            </motion.div>
        </>
    );
};

ProductDetails.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.arrayOf(PropTypes.string),
    discount: PropTypes.number.isRequired,
    minQuantity: PropTypes.number.isRequired,
    quantityUnit: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    shelfLife: PropTypes.string,
    avgRating: PropTypes.string,
    reviewsLength: PropTypes.string,
    nutrition: PropTypes.objectOf(PropTypes.string),
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.string,
};