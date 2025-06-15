import React, { createContext, useMemo, useState } from "react";

export const UserAuthContext = createContext();
export const AdminAuthContext = createContext();

export default function AuthProvider({ children }) {

    const currUser = localStorage.getItem("User");
    const [authUser, setAuthUser] = useState(
        currUser ? JSON.parse(currUser) : undefined
    );

    const admin = localStorage.getItem("Admin");
    const [authAdmin, setAuthAdmin] = useState(admin ? JSON.parse(admin) : undefined);

    const value1 = useMemo(() => ({
        authAdmin,
        setAuthAdmin
    }), [authAdmin]);

    const value2 = useMemo(() => ({
        authUser,
        setAuthUser
    }), [authUser])

    return (
        <AdminAuthContext.Provider value={value1}>
            <UserAuthContext.Provider value={value2}>
                {children}
            </UserAuthContext.Provider>
        </AdminAuthContext.Provider>
    );
}
