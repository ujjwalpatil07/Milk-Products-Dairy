import React, { createContext, useMemo, useState } from "react";

export const UserAuthContext = createContext();
export const AdminAuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const user = localStorage.getItem("User");
    const [authUser, setAuthUser] = useState(user ? JSON.parse(user) : null);

    const admin = localStorage.getItem("Admin");
    const [authAdmin, setAuthAdmin] = useState(admin ? JSON.parse(admin) : null);

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
