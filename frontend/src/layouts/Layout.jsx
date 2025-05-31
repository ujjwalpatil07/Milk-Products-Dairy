import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Layout({ children }) {

    return (
        <div className="h-screen flex flex-col overflow-auto bg-gradient-to-b from-[#EAEADF] to-[#EEF0B0] dark:from-[#121212] dark:to-[#1e1e1e] text-black dark:text-white transition-colors duration-300">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}