import { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("cart");
        if (stored) {
            setCartItems(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        if (cartItems?.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }
    }, [cartItems]);

    const addToCart = (productId, quantity, price) => {
        const formattedQuantity = Number(quantity.toFixed(3));

        setCartItems(prev => {
            const existing = prev.find(item => item.productId === productId);
            if (existing) {
                return prev.map(item =>
                    item.productId === productId
                        ? {
                            ...item,
                            quantity: Number((item.quantity + formattedQuantity).toFixed(3))
                        }
                        : item
                );
            }
            return [...prev, { productId, quantity: formattedQuantity, price }];
        });
    };

    const updateCartItem = (productId, newQuantity) => {
        setCartItems(prev =>
            prev.map(item =>
                item.productId === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.productId !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("cart");
    };

    const value = useMemo(() => ({
        cartItems,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart
    }), [cartItems]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}