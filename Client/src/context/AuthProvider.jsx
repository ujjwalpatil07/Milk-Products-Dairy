import React, { useEffect, useMemo, useState, createContext } from "react";
import { getUserById } from "../services/userService";
import { getAdminById } from "../services/adminService";
import { socket } from "../socket/socket";

export const UserAuthContext = createContext();
export const AdminAuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState(null);
    const [authAdmin, setAuthAdmin] = useState(null);
    const [authUserLoading, setAuthUserLoading] = useState(false);
    const [authAdminLoading, setAuthAdminLoading] = useState(false);
    const [openLoginDialog, setOpenLoginDialog] = useState(false);

    const storedAddress = JSON.parse(localStorage.getItem("deliveryAddress"));
    const [deliveryAddress, setDeliveryAddress] = useState(storedAddress || null);

    useEffect(() => {
        const fetchUserData = async () => {

            try {
                setAuthUserLoading(true);
                const localUser = JSON.parse(localStorage.getItem("User"));

                if (localUser?._id && authUser?._id !== localUser?._id) {
                    const data = await getUserById(localUser?._id)
                    const user = data?.user;

                    if (user) {
                        setAuthUser(user);
                    }
                }
            } catch (error) {
                console.error("User fetch failed", error);
                setAuthUser(null);
            } finally {
                setAuthUserLoading(false);
            }
        };

        fetchUserData();

        window.addEventListener("localStorageChange", fetchUserData);
        return () => window.removeEventListener("localStorageChange", fetchUserData);
    }, [authUser]);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                setAuthAdminLoading(true);
                const localAdmin = JSON.parse(localStorage.getItem("Admin"));
                if (localAdmin?._id && localAdmin?._id !== authAdmin?._id) {
                    const data = await getAdminById(localAdmin?._id);
                    setAuthAdmin(data?.admin);
                }
            } catch {
                setAuthAdmin(null);
            } finally {
                setAuthAdminLoading(false);
            }
        };

        fetchAdminData();

        window.addEventListener("localStorageChange", fetchAdminData);
        return () => window.removeEventListener("localStorageChange", fetchAdminData);
    }, [authAdmin]);

    const handleUserLogout = () => {

        if (socket && authUser?._id) {
            socket.emit("client:logout", { userId: authUser._id });
        }
        setAuthUser(null);
        localStorage.removeItem("User");
    }

    const handleAdminLogout = () => {

        if (socket && authAdmin?._id) {
            socket.emit("client:logout", { adminId: authAdmin._id });
        }
        setAuthAdmin(null);
        localStorage.removeItem("Admin");
    }

    const value1 = useMemo(() => ({
        authAdmin,
        authAdminLoading,
        setAuthAdmin,
        setAuthAdminLoading,
        handleAdminLogout,
    }), [authAdmin, authAdminLoading]);

    const value2 = useMemo(() => ({
        authUser,
        deliveryAddress,
        authUserLoading,
        openLoginDialog,
        setAuthUser,
        setDeliveryAddress,
        setAuthUserLoading,
        setOpenLoginDialog,
        handleUserLogout
    }), [authUser, deliveryAddress, authUserLoading, openLoginDialog]);

    return (
        <AdminAuthContext.Provider value={value1}>
            <UserAuthContext.Provider value={value2}>
                {children}
            </UserAuthContext.Provider>
        </AdminAuthContext.Provider>
    );
}
