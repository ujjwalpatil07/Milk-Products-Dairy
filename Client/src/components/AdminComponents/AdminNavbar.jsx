import { useContext, useState } from "react";
import { SidebarContext } from "../../context/SidebarProvider";
import { AdminAuthContext } from "../../context/AuthProvider";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export default function AdminNavbar() {
    const { authAdmin } = useContext(AdminAuthContext);
    const { setIsSidebarOpen, setNavbarInput } = useContext(SidebarContext);

    const [inputValue, setInputValue] = useState("");

    const handleSearch = () => {
        setNavbarInput(inputValue);
    };

    return (
        <nav className="sticky top-0 left-0 flex items-center justify-between px-4 py-3 bg-white/60 dark:bg-gray-500/20 border-b border-gray-300 dark:border-gray-700 backdrop-blur-md">
            <button
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsSidebarOpen(true)}
            >
                <MenuIcon className="text-gray-700 dark:text-white" />
            </button>

            <div className="flex items-center gap-2 flex-1 max-w-xl mx-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#2c2c2c] text-sm text-black dark:text-white focus:outline-none"
                />
                <button
                    onClick={handleSearch}
                    className="h-9 w-9 rounded-md bg-blue-100 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-500 hover:bg-blue-500/20 transition cursor-pointer"
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
