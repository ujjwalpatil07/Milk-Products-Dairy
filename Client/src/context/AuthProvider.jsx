import React, { useEffect, useMemo, useState, createContext } from "react";
import axios from "axios";

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
                    const res = await axios.post(`http://localhost:9000/u/get-user`, { _id: localUser?._id });
                    const user = res?.data?.user;

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
                    const res = await axios.post(`http://localhost:9000/admin/get-admin`, { _id: localAdmin?._id });
                    setAuthAdmin(res?.data?.admin);
                }
            } catch (error) {
                console.error("Admin fetch failed", error);
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
        setAuthUser(null);
        localStorage.removeItem("User");
    }

    const handleAdminLogout = () => {
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
