import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import { CartContext } from "../../context/CartProvider";

export default function CartProductCard({ item, discount = 0 }) {
    const { name, image, price, selectedQuantity, quantityUnit, type, stock } = item;
    const { removeFromCart, updateCartItem } = useContext(CartContext);

    const [newQty, setNewQty] = useState(selectedQuantity || 0);

    useEffect(() => {
        setNewQty(selectedQuantity || 0);
    }, [name]);

    const originalPrice = price;
    const discountedPrice = discount > 0 ? Math.round(price - (price * discount) / 100) : price;
    const isOutOfStock = stock < newQty;

    const handleUpdate = () => {
        if (newQty < 1 || newQty > stock || selectedQuantity === newQty) return;

        console.log("well");
        updateCartItem(name, newQty);
    };

    const handleRemove = () => {
        removeFromCart(name);
    };

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
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{name}</h2>

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
                    <input
                        type="number"
                        min={1}
                        max={stock}
                        value={newQty}
                        onChange={(e) => setNewQty(Number(e.target.value))}
                        className="hide-input-spin w-20 px-2 py-1 border rounded text-sm"
                    />
                    <button
                        onClick={handleUpdate}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:bg-blue-300"
                        disabled={newQty === selectedQuantity || newQty > stock || newQty < 1}
                    >
                        Update
                    </button>
                    <button
                        onClick={handleRemove}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                    >
                        Remove
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
