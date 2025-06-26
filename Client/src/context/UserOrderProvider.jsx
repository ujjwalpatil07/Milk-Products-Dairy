import React, { createContext, useState, useMemo } from "react";

export const UserOrderContext = createContext();

export default function UserOrderProvider({ children }) {
    const [userOrders, setUserOrders] = useState([]);

    const value = useMemo(() => ({
        userOrders,
        setUserOrders
    }), [userOrders]);

    return (
        <UserOrderContext.Provider value={value}>
            {children}
        </UserOrderContext.Provider>
    );
}
