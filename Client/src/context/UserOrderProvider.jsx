import React, { createContext, useState, useMemo, useEffect, useContext, useCallback } from "react";
import { getUserOrders } from "../services/orderService";
import { UserAuthContext } from "./AuthProvider";
import { toast } from "react-toastify";
import { socket } from "../socket/socket";
import { useSnackbar } from "notistack";

export const UserOrderContext = createContext();

export default function UserOrderProvider({ children }) {

    const { enqueueSnackbar } = useSnackbar();
    const { authUser } = useContext(UserAuthContext);

    const [userOrders, setUserOrders] = useState([]);
    const [orderLoading, setOrderLoading] = useState(true);
    const [notification, setNotification] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setOrderLoading(true);
                const res = await getUserOrders(authUser?._id);
                if (res?.success) {
                    setUserOrders((res.orders || []).reverse());
                } else {
                    toast.error(res.message || "Failed to fetch your orders. Please try again.")
                }
            } catch (err) {
                toast.error(err?.response?.data?.message || "Something went wrong while fetching orders.")
            } finally {
                setOrderLoading(false);
            }
        };

        if (authUser?._id) {
            setNotification(authUser?.notifications || []);
            fetchOrders();
        }
    }, [authUser?._id, authUser?.notifications]);

    const handleUserNotification = useCallback(({ title, description, date }) => {
        setNotification((prev) => [
            {
                title,
                description,
                date: date || new Date().toISOString(),
            },
            ...prev,
        ]);
        enqueueSnackbar(description, { variant: "info" });
    }, [enqueueSnackbar]);

    const handleUserOrderUpdateStatus = ({ orderId, status }) => {
        setUserOrders((prevOrders) =>
            prevOrders?.map((order) =>
                order?._id === orderId ? { ...order, status } : order
            )
        );
    };

    useEffect(() => {
        socket.on("user:notification", handleUserNotification);
        socket.on("user-order:updated-status", handleUserOrderUpdateStatus);

        return () => {
            socket.off("user:notification", handleUserNotification);
            socket.off("user-order:updated-status", handleUserOrderUpdateStatus);
        }
    }, [handleUserNotification]);

    const value = useMemo(() => ({
        userOrders,
        orderLoading,
        notification,
        setUserOrders,
        setOrderLoading,
        setNotification,
    }), [userOrders, orderLoading, notification]);

    return (
        <UserOrderContext.Provider value={value}>
            {children}
        </UserOrderContext.Provider>
    );
}
