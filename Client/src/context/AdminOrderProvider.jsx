import React, { createContext, useState, useMemo, useContext, useEffect } from "react";
import { AdminAuthContext } from "./AuthProvider";
import { getAdminOrders } from "../services/orderService";
import { toast } from "react-toastify";
import { socket } from "../socket/socket";

export const AdminOrderContext = createContext();

export default function AdminOrderProvider({ children }) {

    const { authAdmin } = useContext(AdminAuthContext);
    const [adminOrders, setAdminOrders] = useState([]);
    const [orderLoading, setOrderLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getAdminOrders();
                if (res?.success) {
                    setAdminOrders(res?.orders);
                } else {
                    toast.error(res?.message || "Failed to fetch orders, please try again!")
                }
            } catch (error) {
                toast.error(error?.response?.data?.message || "Failed to fetch orders, please try again!");
            } finally {
                setOrderLoading(false);
            }
        };

        if (authAdmin?._id) {
            fetchOrders();
        }
    }, [authAdmin?._id]);

    const handleNewPendingOrder = ({ order }) => {
        setAdminOrders((prevOrders) => [order, ...prevOrders]);
    }

    useEffect(() => {
        socket.on("order:new-pending-order", handleNewPendingOrder);

        return () => {
            socket.off("order:new-pending-order", handleNewPendingOrder);
        }
    }, []);

    const value = useMemo(() => ({
        adminOrders,
        orderLoading,
        setAdminOrders,
        setOrderLoading,
    }), [adminOrders, orderLoading]);

    return (
        <AdminOrderContext.Provider value={value}>
            {children}
        </AdminOrderContext.Provider>
    );
}
