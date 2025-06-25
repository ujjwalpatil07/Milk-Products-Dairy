import { useContext, useEffect } from "react";
import { SidebarContext } from "../../context/SidebarProvider";
import { AdminAuthContext } from "../../context/AuthProvider";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function AdminNavbar() {

    const location = useLocation();
    
    const { authAdmin } = useContext(AdminAuthContext);
    const { setIsSidebarOpen, navbarInput, setNavbarInput } = useContext(SidebarContext);

    useEffect(() => {
        setNavbarInput("");
    }, [location.pathname, setNavbarInput]);

    return (
        <nav className="sticky top-0 left-0 z-50 flex items-center justify-between px-4 py-5 bg-white/60 dark:bg-gray-500/20 border-b border-gray-300 dark:border-gray-700 backdrop-blur-md">
            <button
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsSidebarOpen(true)}
            >
                <MenuIcon className="text-gray-700 dark:text-white" />
            </button>

            <div className="relative flex-1 max-w-xl mx-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={navbarInput}
                    onChange={(e) => setNavbarInput(e.target.value)}
                    className="w-full ps-3 pe-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#2c2c2c] text-sm text-black dark:text-white focus:outline-none"
                />
                <button
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition"
                    type="button"
                >
                    <SearchIcon fontSize="small" />
                </button>
            </div>

            <div className="flex items-center gap-2">
                <Link to={"/admin/profile"}>
                    <Avatar src={authAdmin?.image} alt={authAdmin?.name} />
                </Link>
            </div>
        </nav>
    );
}
