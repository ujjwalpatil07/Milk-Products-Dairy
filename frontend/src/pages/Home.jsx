import { useContext } from "react"
import { ThemeContext } from "../context/ThemeProvider"

export default function Home() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    console.log(theme);
    return (
        <>
            <h1>This is home page</h1>
            <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
                {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">

                <h3 className="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">Writes upside-down</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
                    The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
                </p>
            </div>
        </>
    )
}