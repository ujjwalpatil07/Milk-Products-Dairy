import React, { useContext, useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import Slide from '@mui/material/Slide';
import { AdminAuthContext, UserAuthContext } from "../../../context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/userService";
import { toast } from "react-toastify";
import { loginAdmin } from "../../../services/adminService";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginDialog() {

    const navigate = useNavigate();
    const location = useLocation();

    const { openLoginDialog, setOpenLoginDialog, handleUserLogout } = useContext(UserAuthContext);
    const { handleAdminLogout } = useContext(AdminAuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loginType, setLoginType] = useState("user");

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            if (loginType === "user") {
                const data = await loginUser(email, password);
                if (data?.user) {
                    localStorage.setItem("User", JSON.stringify(data.user));
                    handleAdminLogout();
                    toast.success("Login Successful!");
                    setOpenLoginDialog(false);
                    setEmail("");
                    setPassword("");
                } else {
                    toast.error("User login failed.");
                }
            } else {
                const data = await loginAdmin(email, password);
                if (data?.admin) {
                    localStorage.setItem("Admin", JSON.stringify(data.admin));
                    handleUserLogout();
                    toast.success("Logged in successfully as Admin");
                    setEmail("");
                    setPassword("");
                    setOpenLoginDialog(false);
                    if (!location.pathname.startsWith("/admin")) {
                        navigate("/admin/dashboard");
                    }
                } else {
                    toast.error("Admin login failed.");
                }
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Server error or invalid credentials.");
        } finally {
            setLoading(false);
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
                <h1 className="text-lg mb-1 font-bold text-center bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 dark:from-yellow-300 dark:via-red-300 dark:to-pink-400 bg-clip-text text-transparent">
                    Madhur Dairy & Daily Needs
                </h1>

                <div className="mb-4 flex justify-center">
                    <div className="inline-flex rounded-md overflow-hidden border border-gray-300 dark:border-gray-600">
                        <button
                            type="button"
                            onClick={() => setLoginType("user")}
                            className={`px-4 py-1 text-sm font-semibold transition-colors duration-300 ${loginType === "user"
                                ? "bg-[#843E71] text-white"
                                : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                        >
                            User
                        </button>
                        <button
                            type="button"
                            onClick={() => setLoginType("admin")}
                            className={`px-4 py-1 text-sm font-semibold transition-colors duration-300 ${loginType === "admin"
                                ? "bg-[#843E71] text-white"
                                : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                        >
                            Admin
                        </button>
                    </div>
                </div>


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
