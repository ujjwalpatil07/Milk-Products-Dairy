import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import { slugify } from "../../utils/slugify";
import { UserAuthContext } from "../../context/AuthProvider";
import { CartContext } from "../../context/CartProvider";
import { products } from "../../data/products";
import { Tooltip } from "@mui/material";

export default function ProductVarietyCard({ image, name, rating, likes, type, price, minQuantity, stock, quantityUnit }) {

    const { authUser } = useContext(UserAuthContext);
    const { cartItems, addToCart } = useContext(CartContext);

    const minQty = Number(minQuantity) || 1;
    const existing = cartItems?.find(item => item?.productId === name);

    const [quantity, setQuantity] = useState(0);
    const [localLikes, setLocalLikes] = useState(likes);

    useEffect(() => {
        setLocalLikes(likes);
    }, [likes])

    const handleAddProduct = (productId, price) => {
        if (quantity <= 0) {
            toast.error("Please select quantity.");
            return;
        }
        if (quantity > stock) {
            toast.error("Stock not available!");
            return;
        }

        addToCart(productId, quantity, price);
        setQuantity(0);
        toast.success("Product added to cart!");
    }

    const handleLikeProduct = (productId) => {
        const category = products?.find(cat => cat.varieties.some(v => v.name === productId));

        if (!category) return;

        const product = category?.varieties?.find(v => v.name === productId);

        if (!product?.likes?.includes(authUser?.name)) {
            product?.likes?.push(authUser?.name);
            setLocalLikes(prevLikes => [...prevLikes, authUser?.name]);
            toast.success("You liked the product!");
        } else {
            toast.info("You already liked this product.");
        }
    }

    return (
        <div className="rounded-lg h-fit overflow-hidden relative shadow-md bg-white dark:bg-gray-500/20 transition-colors duration-300">
            <div className="relative h-44 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
                {(!image || image === "null") ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                        <EmojiFoodBeverageIcon className="text-gray-400 dark:text-gray-300 text-5xl" />
                        <Link to={`/product-details/${slugify(name)}`}>
                            <span className="text-gray-500 dark:text-gray-300 text-sm font-medium hover:text-blue-500">
                                {name}
                            </span>
                        </Link>
                    </div>
                ) : (
                    <Link to={`/product-details/${slugify(name)}`} className="w-full" >
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    </Link>
                )}

                {!localLikes?.includes(authUser?._id) && (
                    <button onClick={() => handleLikeProduct(name)} className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center text-red-500 hover:bg-white/50 dark:bg-gray-500/50 transition-colors cursor-pointer">
                        <FavoriteBorderIcon sx={{ fontSize: "1.3rem" }} />
                    </button>
                )}
            </div>

            <div className="p-4">
                <Link to={`/product-details/${slugify(name)}`} className="text-lg font-bold mb-2 dark:text-white hover:text-blue-500">{name}</Link>

                <div className="grid grid-cols-2 items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                        <StarIcon className="text-[#FE8C00]" sx={{ fontSize: "1.3rem" }} />
                        <span className="text-sm dark:text-gray-300">{rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FavoriteBorderIcon className="text-[#FE8C00]" sx={{ fontSize: "1.3rem" }} />
                        <span className="text-sm text-gray-500 dark:text-gray-400">{localLikes?.length || 0}</span>
                    </div>
                </div>

                <p className="text-sm mb-2 dark:text-gray-300">
                    Type: <span className="font-medium">{type}</span>
                </p>
                <p className="text-sm mb-2 dark:text-gray-300">
                    Price: <span className="font-bold text-[#843E71] dark:text-white">&#8377;{price}</span>
                    <span> / {quantityUnit}</span>
                </p>

                <div className="grid grid-cols-2 mb-2">
                    {stock === 0 && (
                        <p className="text-red-600 font-semibold text-sm">Out of Stock</p>
                    )}

                    {existing && (
                        <span className="text-sm text-gray-500 dark:text-gray-300">
                            In Cart: {existing?.quantity} {quantityUnit}
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-between">
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
                                    className="w-6 h-6 rounded-md flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 text-red-500 disabled:opacity-50"
                                >
                                    <RemoveIcon sx={{ fontSize: "1.2rem" }} />
                                </button>
                            </span>
                        </Tooltip>
                        <input
                            type="number"
                            className="hide-input-spin text-center w-10 dark:text-white font-semibold"
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
                                    className="w-6 h-6 rounded-md flex items-center justify-center bg-green-500/20 hover:bg-green-500/30 text-green-500 disabled:opacity-50"
                                >
                                    <AddIcon sx={{ fontSize: "1.2rem" }} />
                                </button>
                            </span>
                        </Tooltip>

                    </div>

                    <button
                        onClick={() => handleAddProduct(name, price)}
                        disabled={quantity === 0 || quantity > stock}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#843E71] hover:bg-[#843E71] text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <ShoppingCartIcon sx={{ fontSize: "1.2rem" }} />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

ProductVarietyCard.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    minQuantity: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    stock: PropTypes.number,
    price: PropTypes.number.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
    quantityUnit: PropTypes.string.isRequired,
};