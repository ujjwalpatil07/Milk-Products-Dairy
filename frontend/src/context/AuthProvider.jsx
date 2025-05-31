import { createContext, useMemo, useState } from "react";

export const UserAuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState({
        fullName: "Gaurav Bhagawan Patil",
        username: "gaurav123",
        email: "gaurav78@gmail.com",
        image: "https://plus.unsplash.com/premium_photo-1675827055694-010aef2cf08f?q=80&w=2024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        mobileNo: 4578895623,
        role: "admin",
        shopName: "Sagar Milk Dairy & Sweets",
        address: "Flat No. 202, Krishna Residency Sector 12, Kharghar Navi Mumbai, Maharashtra - 410210 India",
    });

    const value = useMemo(() => ({
        authUser,
        setAuthUser
    }), [authUser]);

    return (
        <UserAuthContext.Provider value={value}>
            {children}
        </UserAuthContext.Provider>
    );
}
