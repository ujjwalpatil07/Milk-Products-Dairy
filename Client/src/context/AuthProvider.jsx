import React, { useEffect, useMemo, useState, createContext } from "react";
import axios from "axios";

export const UserAuthContext = createContext();
export const AdminAuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState(null);
    const [authAdmin, setAuthAdmin] = useState(null);

    const [deliveryAddress, setDeliveryAddress] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const localUser = JSON.parse(localStorage.getItem("User"));
                const storedAddress = JSON.parse(localStorage.getItem("deliveryAddress"));

                if (storedAddress) {
                    setDeliveryAddress(storedAddress);
                }

                if (localUser?._id && authUser?._id !== localUser?._id) {
                    const res = await axios.post(`http://localhost:9000/u/get-user`, { _id: localUser?._id });
                    const user = res?.data?.user;

                    if (user) {
                        setAuthUser(user);

                        if (!storedAddress) {
                            const generatedAddress = {
                                owner: user._id,
                                addressType: "Home",
                                name: `${user.firstName} ${user.lastName}`,
                                phone: user.mobileNo,
                                streetAddress: user.address?.streetAddress || "",
                                city: user.address?.city || "",
                                state: "Maharashtra",
                                pincode: user.address?.pincode || ""
                            };

                            localStorage.setItem("deliveryAddress", JSON.stringify(generatedAddress));
                            setDeliveryAddress(generatedAddress);
                        }
                    }
                }
            } catch (error) {
                console.error("User fetch failed", error);
                setAuthUser(null);
            }
        };

        fetchUserData();

        window.addEventListener("localStorageChange", fetchUserData);
        return () => window.removeEventListener("localStorageChange", fetchUserData);
    }, [authUser]);

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
        setAuthAdmin,
        handleAdminLogout
    }), [authAdmin]);

    const value2 = useMemo(() => ({
        authUser,
        deliveryAddress,
        setAuthUser,
        setDeliveryAddress,
        handleUserLogout
    }), [authUser, deliveryAddress]);

    return (
        <AdminAuthContext.Provider value={value1}>
            <UserAuthContext.Provider value={value2}>
                {children}
            </UserAuthContext.Provider>
        </AdminAuthContext.Provider>
    );
}
