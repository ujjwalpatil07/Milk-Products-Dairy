import React, { useContext, useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import Slide from '@mui/material/Slide';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AdminAuthContext, UserAuthContext } from "../../../context/AuthProvider";
import { Link } from "react-router-dom";
import { loginUser } from "../../../services/userService";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginDialog() {

    const { openLoginDialog, setOpenLoginDialog } = useContext(UserAuthContext);
    const { handleAdminLogout } = useContext(AdminAuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const data = await loginUser(email, password);
            if (data?.user) {
                localStorage.setItem("User", JSON.stringify(data.user));
                handleAdminLogout();
                toast.success("Login Successful!");
                setOpenLoginDialog(false);
            } else {
                toast.error("Login failed, please try again.");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Server error or invalid credentials.");
        } finally {
            setLoading(false);
            setEmail("");
            setPassword("");
        }
    }

    return (
        <Dialog
            open={openLoginDialog}
            onClose={() => setOpenLoginDialog(false)}
            maxWidth="xs"
            fullWidth
            slots={{
                transition: Transition,
            }}>
            <DialogContent className="p-6 bg-white dark:bg-gray-900 rounded-md">
                <h2 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200">
                    Welcome to
                </h2>
                <h1 className="text-lg mb-4 font-bold text-center bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 dark:from-yellow-300 dark:via-red-300 dark:to-pink-400 bg-clip-text text-transparent">
                    Madhur Dairy & Daily Needs
                </h1>

                <form onSubmit={handleLoginSubmit} className="space-y-3">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#843E71]"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#843E71]"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-1 w-full bg-[#843E71] text-white py-2 rounded hover:bg-[#6f3360] transition text-sm font-medium disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading && (
                            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        )}
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        Don't have an account?{" "}
                        <Link
                            to={"/signup"}
                            onClick={() => setOpenLoginDialog(false)}
                            className="text-[#843E71] hover:underline cursor-pointer"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
