import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import happyFamily from "../assets/happyFamily.png";
import { ThemeContext } from "../context/ThemeProvider";
import { faqs, products } from "../data/products";
import ProductCard from "../components/LandingComponents/ProductCard";
import QuestionAnswer from "../components/LandingComponents/QuestionAnswer";
import reviewDarkImage from "../assets/reviewDarkImage.png";
import reviewLightImage from "../assets/reviewLightImage.png"


export default function LandingPage() {

    const { theme } = useContext(ThemeContext);

    return (
        <>
            <section className="w-full overflow-hidden">
                <img
                    src={happyFamily}
                    alt="Happy Family"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                />
            </section>

            <section className="py-16 px-6 text-center">

                <h1
                    className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 dark:from-yellow-300 dark:via-red-300 dark:to-pink-400 bg-clip-text text-transparent inline-block "
                >
                    Dadhur Dairy & Daily Needs
                </h1>

                <p className="text-xl md:text-2xl mb-6 font-semibold text-gray-900 dark:text-gray-100">
                    Bringing Nature's Best, Straight to Your Home
                </p>

                <p className="max-w-2xl mx-auto mb-8 text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                    From farm-fresh milk to creamy ghee, soft paneer to delicious sweets — savor the pure taste of tradition in every bite.
                </p>

                <Link
                    to="/products"
                    className=" inline-block px-8 py-3 rounded-full font-semibold text-lg bg-yellow-400 text-gray-900 hover:bg-yellow-500 dark:bg-yellow-600 dark:text-gray-900 dark:hover:bg-yellow-700 transition-colors duration-300 "
                >
                    Explore Our Products
                </Link>
            </section>

            <section className="py-12 px-6 md:px-20">
                <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-gray-100">
                    Our Product Categories
                </h2>

                <div className="space-y-14 max-w-7xl mx-auto">
                    {
                        products.map((product, index) => (
                            <motion.div
                                key={index * 0.6}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 bg-white dark:bg-[#2b2b2b] p-6 rounded-xl transition-colors duration-300`}
                            >
                                <ProductCard
                                    title={product.title}
                                    description={product.description}
                                    image={product.image}
                                    features={product?.features}
                                />
                            </motion.div>
                        ))
                    }
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-4 py-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex justify-center items-center w-full md:w-1/2">
                        <img
                            src={theme === "light" ? reviewDarkImage : reviewLightImage}
                            alt="Customer Reviews"
                            className="rounded-xl w-70 md:w-100 h-auto"
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <h2 className="text-2xl font-bold mb-4">What Our Customers Say</h2>
                        <p className="text-gray-700 dark:text-gray-300 text-lg">
                            At <span className="font-semibold">Madhur Dairy and Daily Needs</span>, we provide fresh, nutritious, and
                            high-quality milky products loved by families and especially ideal for small children. Our customers' feedback
                            reflects our commitment to quality and health!
                        </p>
                    </div>
                </div>
            </section>

            <section className="max-w-3xl mx-auto px-4 py-10">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <QuestionAnswer key={index * 0.5} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </section>
        </>
    );
}
