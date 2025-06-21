import { useContext, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link, useLocation } from "react-router-dom";
import { UserAuthContext } from "../context/AuthProvider";
import UserProfileSidebar from "../components/UserProfileSidebar";

export default function UserProfileLayout({ children }) {

    const scrollRef = useRef(null);
    const location = useLocation();

    const { authUser } = useContext(UserAuthContext);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0 });
        }
    }, [location.pathname]);

    const isUserInStorage = localStorage.getItem("User");

    if (isUserInStorage && !authUser) {
        return (
            <div className="h-screen p-4 gap-3 flex justify-center items-center bg-[#F0F1F3] dark:bg-[#121212] text-black dark:text-white transition-colors duration-300">
                <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-[#843E71]"></div>
                <p className="text-sm animate-pulse">Loading your profile... Please wait.</p>
            </div>
        );
    }

    if (!isUserInStorage && !authUser) {
        return (
            <div className="h-screen p-4 flex flex-col items-center justify-center text-center space-y-4 bg-[#F0F1F3] dark:bg-[#121212] text-black dark:text-white transition-colors duration-300">
                <span className="text-red-500 font-medium">
                    You must be logged in to access this page.
                </span>
                <Link
                    to="/login"
                    className="px-4 py-2 bg-[#843E71] text-white rounded hover:bg-[#843E7190] transition"
                >
                    Go to Login
                </Link>
            </div>
        );
    }


    return (
        <div ref={scrollRef} className="h-screen scroll-smooth flex flex-col overflow-y-auto overflow-x-hidden bg-[#F0F1F3] dark:bg-[#121212] text-black dark:text-white transition-colors duration-300">
            <Navbar />
            <main className="flex-1 flex flex-col md:flex-row py-5 p-3 gap-5 mx-auto">
                <UserProfileSidebar />

                {children}

            </main>
            <Footer />
        </div>
    )
}