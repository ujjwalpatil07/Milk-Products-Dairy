import React, { createContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

export const UserAuthContext = createContext();
export const AdminAuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState(null);
    const [authAdmin, setAuthAdmin] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const localUser = JSON.parse(localStorage.getItem("User"));
                if (localUser?._id && authUser?._id !== localUser?._id) {
                    const res = await axios.post(`http://localhost:9000/u/get-user`, { _id: localUser?._id });
                    setAuthUser(res?.data?.user);
                }
            } catch (error) {
                console.error("User fetch failed", error);
                setAuthUser(null);
            }
        };

        fetchUserData();

        window.addEventListener("localStorageChange", fetchUserData);
        return () => window.removeEventListener("localStorageChange", fetchUserData);
    }, []);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const localAdmin = JSON.parse(localStorage.getItem("Admin"));
                if (localAdmin?._id && localAdmin?._id !== authAdmin?._id) {
                    const res = await axios.post(`http://localhost:9000/admin/get-admin`, { _id: localAdmin?._id });
                    setAuthAdmin(res?.data?.admin);
                }
            } catch (error) {
                console.error("Admin fetch failed", error);
                setAuthAdmin(null);
            }
        };

        fetchAdminData();

        window.addEventListener("localStorageChange", fetchAdminData);
        return () => window.removeEventListener("localStorageChange", fetchAdminData);
    }, []);

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
        setAuthAdmin,
        handleAdminLogout
    }), [authAdmin]);

    const value2 = useMemo(() => ({
        authUser,
        setAuthUser,
        handleUserLogout
    }), [authUser]);

    return (
        <AdminAuthContext.Provider value={value1}>
            <UserAuthContext.Provider value={value2}>
                {children}
            </UserAuthContext.Provider>
        </AdminAuthContext.Provider>
    );
}
