import { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {

    const scrollRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if(scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0 });
        }
    }, [location.pathname]);

    return (
        <div ref={scrollRef} className="h-screen scroll-smooth flex flex-col overflow-auto bg-[#F0F1F3] dark:bg-[#121212] text-black dark:text-white transition-colors duration-300">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}