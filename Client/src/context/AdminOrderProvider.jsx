import React, { createContext, useState, useMemo, useContext, useEffect } from "react";
import { AdminAuthContext } from "./AuthProvider";
import { getAdminOrders } from "../services/orderService";
import { socket } from "../socket/socket";
import { useSnackbar } from "notistack";

export const AdminOrderContext = createContext();

export default function AdminOrderProvider({ children }) {

    const { enqueueSnackbar } = useSnackbar();
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
                    enqueueSnackbar(res?.message || "Failed to fetch orders, please try again!", { variant: "error" })
                }
            } catch (error) {
                enqueueSnackbar(error?.response?.data?.message || "Failed to fetch orders, please try again!", { variant: "error" });
            } finally {
                setOrderLoading(false);
            }
        };

        if (authAdmin?._id) {
            fetchOrders();
        }
    }, [authAdmin?._id, enqueueSnackbar]);

    const handleNewPendingOrder = ({ order }) => {
        setAdminOrders((prevOrders) => [...prevOrders, order]);
    };

    const handleRemoveOrder = ({ orderId }) => {
        if (!orderId) return;

        setAdminOrders((prevOrders) =>
            prevOrders?.filter((order) => order?._id !== orderId)
        );
    };

    useEffect(() => {
        socket.on("order:new-pending-order", handleNewPendingOrder);
        socket.on("order:accept-success", handleRemoveOrder);
        socket.on("order:reject-success", handleRemoveOrder);

        return () => {
            socket.off("order:new-pending-order", handleNewPendingOrder);
            socket.off("order:accept-success", handleRemoveOrder);
            socket.off("order:reject-success", handleRemoveOrder);
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
