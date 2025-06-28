import React, { createContext, useState, useMemo, useContext, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { AdminAuthContext } from "./AuthProvider";
import { getAdminOrders, getAllOrders } from "../services/orderService";
import { socket } from "../socket/socket";
import { useSnackbar } from "notistack";

export const AdminOrderContext = createContext();

export default function AdminOrderProvider({ children }) {

    const { enqueueSnackbar } = useSnackbar();
    const { authAdmin } = useContext(AdminAuthContext);
    const [adminOrders, setAdminOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [orderLoading, setOrderLoading] = useState(true);
    const [allOrdersLoading, setAllOrdersLoading] = useState(true);
    const [notification, setNotification] = useState([]);

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
            setNotification(authAdmin?.notifications || []);
            fetchOrders();
        }
    }, [authAdmin?._id, enqueueSnackbar, authAdmin?.notifications]);

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const res = await getAllOrders();
                if (res?.success) {
                    setAllOrders(res?.orders);
                }
            } catch (error) {
                enqueueSnackbar(error?.response?.data?.message || "Failed to fetch orders, please try again!", { variant: "error" });
            }finally{
                setAllOrdersLoading(false);
            }
        };

        if (authAdmin?._id) {
            fetchAllOrders();
        }
    }, [enqueueSnackbar, adminOrders, authAdmin?._id]);

    const handleAdminNotification = useCallback(({ title, description, date }) => {
        setNotification((prev) => [
            {
                title,
                description,
                date: date || new Date().toISOString(),
            },
            ...prev,
        ]);

    }, []);

    
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
        socket.on("admin:notification", handleAdminNotification)

        return () => {
            socket.off("order:new-pending-order", handleNewPendingOrder);
            socket.off("order:accept-success", handleRemoveOrder);
            socket.off("order:reject-success", handleRemoveOrder);
            socket.off("admin:notification", handleAdminNotification)

        }
    }, [handleAdminNotification]);

    const value = useMemo(() => ({
        adminOrders,
        allOrders,
        orderLoading,
        allOrdersLoading,
        notification,
        setAdminOrders,
        setAllOrders,
        setOrderLoading,
        setAllOrdersLoading,
        setNotification
    }), [adminOrders, orderLoading, allOrders, notification,allOrdersLoading]);

    return (
        <AdminOrderContext.Provider value={value}>
            {children}
        </AdminOrderContext.Provider>
    );
}


AdminOrderProvider.propTypes = {
    children: PropTypes.node.isRequired,
};