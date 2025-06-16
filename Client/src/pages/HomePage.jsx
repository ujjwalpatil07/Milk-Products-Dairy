import Marquee from "react-fast-marquee";
import DairyProductsCarousel from "../components/HomeComponents/DairyProductsCarousel";
import heroImage from "../assets/heroImage.png"
import OfferingCard from "../components/HomeComponents/OfferingCard";
import { offerings, products } from "../data/products";
import { useContext, useState } from "react";
import OfferingProductCard from "../components/HomeComponents/OfferingProductCard";
import { Link } from "react-router-dom";
import TestimonialCard from "../components/HomeComponents/TestimonialCard";
import { testimonials } from "../data/productGoodness ";
import ProductProcess from "../components/ProductProcess";
import { UserAuthContext } from "../context/AuthProvider";


export default function HomePage() {

    const { authUser } = useContext(UserAuthContext);
    const [productCount, setProductCount] = useState(8);

    const handleLoadMore = () => {
        setProductCount((prev) => prev + 3);
    };
    
    return (
        <>
            <section className="w-full p-3 sm:p-6">
                <div className="relative max-w-7xl mx-auto overflow-hidden rounded-xl shadow-lg">
                    <img
                        src={heroImage}
                        alt="Welcome Banner"
                        loading="lazy"
                        className="w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center px-6">
                        <div className="text-center">
                            {
                                (authUser && <>
                                    <h1 className="text-lg sm:text-xl md:text-5xl font-bold md:mb-2 text-yellow-100">
                                        Hi <span className="text-[#FFEB3B]">{authUser?.firstName} {authUser?.lastName}</span>
                                    </h1>

                                    <h2 className="text-lg md:text-3xl text-white">
                                        Welcome To
                                    </h2>
                                </>)
                            }

                            <h1 className="text-lg sm:text-2xl md:text-7xl font-bold mb-4 bg-gradient-to-t from-[#00ce03] to-white bg-clip-text text-transparent">
                                Madhur Dairy and Daily Needs
                            </h1>


                            <p className="hidden sm:flex text-sm md:text-2xl max-w-2xl mx-auto text-gray-100">
                                Pure goodness in every drop — nourishing your family with love, care, and the freshest dairy delights.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-3 py-5 sm:px-6 md:py-15">

                <h2 className="text-xl md:text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                    Discover Our Delicious Dairy Range
                </h2>

                <Marquee speed={40} gradient={false} pauseOnHover={true}>
                    <DairyProductsCarousel half={"first"} />
                </Marquee>
                <Marquee speed={35} gradient={false} direction="right" className="mt-6" pauseOnHover={true}>
                    <DairyProductsCarousel half={"second"} />
                </Marquee>
            </section>

            <section className="py-16 px-3 md:px-10 transition-colors duration-300">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                        Elevate Your Health <br />
                        <span className="text-[#706c93] dark:text-indigo-400">
                            With Our Superior Dairy Range
                        </span>
                    </h2>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:px-5 lg:px-20">
                        {offerings.map((item, index) => (
                            <OfferingCard
                                key={index * 0.6}
                                image={item.image}
                                title={item.title}
                                description={item.description}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 md:px-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Our Goodness</h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm md:text-base">
                        Comes in many forms — all pure, nutritious, and farm-fresh.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {products.slice(0, productCount).map((product, index) => (
                        <OfferingProductCard key={index * 0.7} title={product.title} image={product.image} />
                    ))}
                </div>

                {productCount < products.length && (
                    <div className="mt-10 flex justify-center">
                        <button
                            onClick={handleLoadMore}
                            className="bg-[#213448] text-white px-6 py-2 rounded-full shadow-md transition"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </section>

            <section className="mb-10 w-full py-10 px-4 sm:px-6 md:px-16 bg-white dark:bg-gray-700/20 transition-colors duration-500">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">

                    <div className="h-full flex items-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-snug">
                            Taste the Tradition, <br className="hidden sm:block" />
                            Crafted with Care & Purity
                        </h2>
                    </div>

                    <div className="flex flex-col gap-6">
                        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
                            From farm to table, every product is a promise of natural goodness. Our dairy delights are made to nourish your day with flavor and freshness you can trust.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <Link
                                to="/products"
                                className="px-6 py-2.5 rounded-md text-sm font-medium bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition"
                            >
                                Shop Now
                            </Link>
                            <Link
                                to="/contact"
                                className="px-6 py-2.5 rounded-md text-sm font-medium border border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black transition"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 px-6 md:px-16 transition-colors duration-500">
                <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
                    What Our Customers Say
                </h2>
                <Marquee gradient={false} speed={20}>
                    <div className="flex gap-10 p-3">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard key={index * 0.6} {...testimonial} />
                        ))}
                    </div>
                </Marquee>
            </section>

            <ProductProcess />
        </>
    );
}
