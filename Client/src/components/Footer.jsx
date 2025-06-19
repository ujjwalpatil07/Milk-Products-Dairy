import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import logoDarkMode from "../assets/logoDarkMode.png";
import logoLightMode from "../assets/logoLightMode.png";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Footer() {
    const { theme } = useContext(ThemeContext);

    return (
        <motion.footer
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={containerVariants}
            className="bg-white dark:bg-[#282828] text-gray-700 dark:text-gray-300 transition-colors duration-300"
        >
            <div className="max-w-7xl mx-auto px-6 py-10">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-4 gap-8"
                    variants={containerVariants}
                >
                    <motion.div variants={columnVariants} className="flex flex-col">
                        <img
                            src={theme === "light" ? logoLightMode : logoDarkMode}
                            alt="Madhur Dairy Logo"
                            className="w-30 mb-3"
                        />
                        <h2 className="text-lg font-semibold">
                            Madhur Dairy & Daily Needs
                        </h2>
                        <div className="flex gap-4 mt-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FacebookIcon className="hover:text-blue-600 transition duration-300" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <InstagramIcon className="hover:text-pink-500 transition duration-300" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <LinkedInIcon className="hover:text-blue-500 transition duration-300" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Column 2 */}
                    <motion.div variants={columnVariants} className="flex flex-col">
                        <h3 className="text-lg font-semibold mb-4">Our Services</h3>
                        <ul className="space-y-2">
                            <li><a href="/dairy-products" className="hover:underline">Dairy Products</a></li>
                            <li><a href="/subscriptions" className="hover:underline">Subscriptions</a></li>
                            <li><a href="/delivery" className="hover:underline">Home Delivery</a></li>
                        </ul>
                    </motion.div>

                    {/* Column 3 */}
                    <motion.div variants={columnVariants} className="flex flex-col">
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="/about" className="hover:underline">About Us</a></li>
                            <li><a href="/faq" className="hover:underline">FAQ</a></li>
                            <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
                        </ul>
                    </motion.div>

                    {/* Column 4 */}
                    <motion.div variants={columnVariants} className="flex flex-col">
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2">
                            <li><a href="/contact-us" className="hover:underline">Contact Us</a></li>
                            <li><a href="/support" className="hover:underline">Customer Support</a></li>
                            <li><a href="/feedback" className="hover:underline">Feedback</a></li>
                        </ul>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="mt-10 border-t pt-4 text-sm text-center text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    &copy; {new Date().getFullYear()} Madhur Dairy & Daily Needs. All rights reserved.
                </motion.div>
            </div>
        </motion.footer>
    );
}
