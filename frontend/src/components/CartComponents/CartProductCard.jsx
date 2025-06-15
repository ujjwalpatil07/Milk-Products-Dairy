import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { CartContext } from "../../context/CartProvider";

export default function CartProductCard({ item, discount = 0 }) {
    const { name, image, price, selectedQuantity, quantityUnit, type, stock } = item;
    const { removeFromCart, updateCartItem } = useContext(CartContext);

    const [newQty, setNewQty] = useState(selectedQuantity || 0);

    useEffect(() => {
        setNewQty(selectedQuantity || 0);
    }, [name, selectedQuantity]);

    useEffect(() => {
        if (newQty !== selectedQuantity && newQty > 0 && newQty <= stock) {
            updateCartItem(name, newQty);
        }
    }, [newQty]);

    const originalPrice = price;
    const discountedPrice = discount > 0 ? Math.round(price - (price * discount) / 100) : price;
    const isOutOfStock = stock < newQty;

    return (
        <div className={`w-full rounded-lg p-2 flex items-center gap-4 transition relative dark:bg-gray-500/20 bg-white ${isOutOfStock && "opacity-60"}`}>
            <div className="h-22 w-22 md:w-32 md:h-32 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                {image ? (
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <EmojiFoodBeverageIcon className="text-gray-400 text-4xl" />
                    </div>
                )}
            </div>

            <div className="flex-1">
                <div className="flex justify-between">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">{name}</h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setNewQty(prev => Math.max(0, prev - 0.5))}
                            disabled={newQty <= 0}
                            className="w-6 h-6 rounded-md flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 text-red-500 disabled:opacity-50"
                        >
                            <RemoveIcon sx={{ fontSize: "1.2rem" }} />
                        </button>
                        <input
                            type="number"
                            min={1}
                            max={stock}
                            value={newQty}
                            onChange={(e) => setNewQty(Number(e.target.value))}
                            className="hide-input-spin text-center w-10 px-2 py-1 border border-[#843E71] rounded text-sm"
                        />
                        <button
                            disabled={newQty >= stock}
                            onClick={() => setNewQty(prev => prev + 0.5)}
                            className="w-6 h-6 rounded-md flex items-center justify-center bg-green-500/20 hover:bg-green-500/30 text-green-500 disabled:opacity-50"
                        >
                            <AddIcon sx={{ fontSize: "1.2rem" }} />
                        </button>
                    </div>

                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-[#843E71]">&#8377;{discountedPrice}</span>
                    {discount > 0 && (
                        <>
                            <span className="text-sm line-through text-gray-500">&#8377;{originalPrice}</span>
                            <span className="text-sm text-green-600">({discount}% OFF)</span>
                        </>
                    )}
                </div>

                <p className="text-sm text-gray-600">
                    Selected Quantity: <span className="font-medium">{selectedQuantity} {quantityUnit}</span> ({type})
                </p>

                {isOutOfStock && (
                    <p className="text-sm text-red-600 font-medium">
                        Only {stock} left in stock. Please reduce quantity.
                    </p>
                )}

                <div className="flex items-center gap-2 mt-3">
                    <button
                        onClick={() => removeFromCart(name)}
                        className="px-3 py-1 rounded text-sm text-[#843E71] hover:bg-[#843E7120] border shadow-md disabled:cursor-not-allowed"
                    >
                        Remove From Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

CartProductCard.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string,
        price: PropTypes.number.isRequired,
        selectedQuantity: PropTypes.number.isRequired,
        quantityUnit: PropTypes.string,
        type: PropTypes.string,
        stock: PropTypes.number.isRequired,
    }).isRequired,
    discount: PropTypes.number,
};    
