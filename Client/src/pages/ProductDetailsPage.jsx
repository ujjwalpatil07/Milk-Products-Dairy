import { useContext, useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import { Pagination } from "@mui/material";
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';

import { ThemeContext } from "../context/ThemeProvider";

import ProductDetails from "../components/ProductDetalisComponent/ProductDetails";
import ReviewSection from "../components/ProductDetalisComponent/ReviewSection.jsx";

import { slugify } from "../utils/slugify";
import { getAverageRating } from "../utils/averageRating";
import { recommendProducts } from "../utils/filterData";
import { unslugify } from "../utils/unslugify.js"

import { getProductByName, getProducts } from "../services/productServices.js";


export default function ProductDetailsPage() {

    const { productId } = useParams();
    const { theme } = useContext(ThemeContext);

    const [page, setPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [recommendProductLoading, setRecommendProductLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const { product } = await getProductByName(unslugify(productId));
                setSelectedProduct(product);
            } catch (error) {
                console.log(error?.response?.data?.message || "Failed to fetch product");
            } finally {
                setLoading(false);
            }
        };

        const fetchAllProducts = async () => {
            try {
                const dbProducts = await getProducts();
                if (dbProducts?.products) {
                    const currRelatedProducts = recommendProducts(dbProducts.products, productId);
                    setRelatedProducts(currRelatedProducts)
                }
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setRecommendProductLoading(false);
            }
        };

        fetchProduct();
        fetchAllProducts();
    }, [productId]);

    const totalPages = Math.ceil(relatedProducts.length / 10);
    const startIndex = (page - 1) * 10;
    const currentItems = relatedProducts.slice(startIndex, startIndex + 10);

    const handlePageChange = (_, value) => {
        setPage(value);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh] text-gray-600 dark:text-white gap-3">
                <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-[#843E71]"></div>
                <span className="text-xl">Loading product...</span>
            </div>
        );
    }

    if (!selectedProduct || !productId) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600 dark:text-white text-lg mb-3">{unslugify(productId)} Product not found.</p>
                <Link
                    to="/products"
                    className="mt-4 px-4 py-2 bg-[#843E71] text-white rounded hover:bg-[#843E71] transition"
                >
                    Go to Products
                </Link>
            </div>
        );
    }

    return (
        <>
            <section className="px-3 md:px-6 py-6 md:py-10 md:max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6 ">
                    <ProductDetails
                        id={selectedProduct?._id || ""}
                        name={selectedProduct?.name || "Unnamed Product"}
                        description={selectedProduct?.description || "No description available."}
                        image={selectedProduct?.image || []}
                        discount={selectedProduct?.discount || 0}
                        minQuantity={selectedProduct?.minQuantity || 1}
                        quantityUnit={selectedProduct?.quantityUnit || "Unit"}
                        type={selectedProduct?.type || "N/A"}
                        stock={selectedProduct?.stock ?? 0}
                        shelfLife={selectedProduct?.shelfLife || "N/A"}
                        avgRating={getAverageRating(selectedProduct?.reviews || [])}
                        reviewsLength={selectedProduct?.reviews?.length || 0}
                        nutrition={selectedProduct?.nutrition || new Map()}
                        likes={selectedProduct?.likes || []}
                        price={selectedProduct?.price ?? 0}
                    />

                </div>
            </section>

            {
                recommendProductLoading && <div className="flex items-center justify-center h-[50vh] text-gray-600 dark:text-white gap-3 border-t border-dashed border-gray-500/50">
                    <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-[#843E71]"></div>
                    <span>Recommended Products...</span>
                </div>
            }

            {
                (relatedProducts?.length > 0 && !recommendProductLoading) && <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="px-3 md:px-6 pb-6 md:pb-10 md:max-w-6xl mx-auto"
                >

                    <h1 className="border-t border-dashed border-gray-500/50 pb-2 pt-5 text-xl font-semibold">Related Product</h1>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
                        {currentItems.map((product, idx) => (
                            <motion.div
                                key={product?._id || idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05, duration: 0.4 }}
                                className="bg-white dark:bg-gray-500/20 transition-colors duration-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg"
                            >
                                {!product?.image?.[0] ? (
                                    <div className="w-full h-40 flex flex-col items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800">
                                        <EmojiFoodBeverageIcon className="text-gray-400 dark:text-gray-300 text-5xl" />
                                        <Link to={`/product-details/${slugify(product?.name)}`}>
                                            <span className="text-gray-500 dark:text-gray-300 text-sm font-medium hover:text-blue-500">
                                                {product?.name}
                                            </span>
                                        </Link>
                                    </div>
                                ) : (
                                    <Link to={`/product-details/${slugify(product?.name)}`} className="w-full">
                                        <img
                                            src={product?.image?.[0]}
                                            alt={product?.name}
                                            className="w-full h-40 object-cover"
                                        />
                                    </Link>
                                )}

                                <div className="p-4">
                                    <Link
                                        to={`/product-details/${slugify(product?.name)}`}
                                        className="text-lg font-semibold text-gray-800 dark:text-white truncate hover:text-blue-500 line-clamp-1"
                                    >
                                        {product?.name}
                                    </Link>

                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                                        {product?.description || ""}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center mt-6">
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                variant="outlined"
                                shape="rounded"
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        color: theme === 'dark' ? '#ffffff' : '#000000',
                                        borderColor: theme === 'dark' ? '#555' : '#ccc',
                                    },
                                    '& .Mui-selected': {
                                        backgroundColor: '#843E71',
                                        color: '#ffffff',
                                        borderColor: '#843E71',
                                        '&:hover': {
                                            backgroundColor: '#843E71',
                                        },
                                    },
                                }}
                            />

                        </div>
                    )}

                </motion.section>
            }

            {
                (selectedProduct) && <section className="px-3 md:px-6 py-6 md:py-10 md:max-w-6xl mx-auto">
                    <h1 className="border-t border-dashed border-gray-500/50 pb-2 pt-5 text-xl font-semibold">Product Reviews</h1>

                    <ReviewSection reviews={selectedProduct?.reviews || []} productId={selectedProduct?._id} />
                </section>
            }
        </>
    )
}