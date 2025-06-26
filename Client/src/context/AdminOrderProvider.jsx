import React, { createContext, useState, useMemo } from "react";

export const AdminOrderContext = createContext();

export default function AdminOrderProvider({ children }) {
    const [adminOrders, setAdminOrders] = useState([]);

    const value = useMemo(() => ({
        adminOrders,
        setAdminOrders
    }), [adminOrders]);

    return (
        <AdminOrderContext.Provider value={value}>
            {children}
        </AdminOrderContext.Provider>
    );
}
