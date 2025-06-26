import React, { createContext, useState, useMemo, useEffect, useContext } from "react";
import { getUserOrders } from "../services/orderService";
import { UserAuthContext } from "./AuthProvider";
import { toast } from "react-toastify";

export const UserOrderContext = createContext();

export default function UserOrderProvider({ children }) {

    const { authUser } = useContext(UserAuthContext);

    const [userOrders, setUserOrders] = useState([]);
    const [orderLoading, setOrderLoading] = useState(true);

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

        if(authUser?._id) {
            fetchOrders();
        }
    }, [authUser?._id]);

    const value = useMemo(() => ({
        userOrders,
        orderLoading,
        setUserOrders,
        setOrderLoading,
    }), [userOrders, orderLoading]);

    return (
        <UserOrderContext.Provider value={value}>
            {children}
        </UserOrderContext.Provider>
    );
}
