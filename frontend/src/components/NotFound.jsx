import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";
import logoDarkMode from "../assets/logoDarkMode.png";
import logoLightMode from "../assets/logoLightMode.png";

export default function NotFound() {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full flex items-center justify-center px-4 bg-white text-gray-800 dark:bg-[#121212] dark:text-gray-100">
            <div className="bg-white dark:bg-gray-800 rounded-lg px-8 py-8 ring-gray-900/5 text-center max-w-2xl w-full">
                <div className="mb-6 flex items-center justify-center">
                    <img
                        src={theme === "light" ? logoLightMode : logoDarkMode}
                        alt="Madhur Dairy & Daily Needs Logo"
                        loading="lazy"
                        className="h-16"
                    />
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-red-800">404</h1>
                    <p className="text-xl md:text-2xl font-semibold">Oops! Page not found.</p>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="mt-4 px-6 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300"
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
}
