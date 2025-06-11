import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Layout({ children }) {

    return (
        <div className="h-screen scroll-smooth flex flex-col overflow-auto bg-[#F0F1F3] dark:bg-[#121212] text-black dark:text-white transition-colors duration-300">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}