import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";
import ProductDetails from "../components/ProductDetalisComponent/ProductDetails";
import { slugify } from "../utils/slugify";
import { getAverageRating } from "../utils/averageRating";
import { recommendProducts } from "../utils/filterData";
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import { Pagination } from "@mui/material";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import ReviewSection from "../components/ProductDetalisComponent/ReviewSection.jsx"

export default function ProductDetailsPage() {

    const { productId } = useParams();
    const { theme } = useContext(ThemeContext);

    const allVarieties = products.flatMap((p) => p.varieties);
    const selectedVariety = allVarieties.find((v) => slugify(v?.name) === productId);

    const relatedProducts = recommendProducts(products, productId);

    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(relatedProducts.length / 10);
    const startIndex = (page - 1) * 10;
    const currentItems = relatedProducts.slice(startIndex, startIndex + 10);

    const handlePageChange = (_, value) => {
        setPage(value);
    };

    return (
        <>
            <section className="px-3 md:px-6 py-6 md:py-10 md:max-w-6xl mx-auto">
                {
                    (!selectedVariety || !productId) ? (
                        <div className="py-25 text-center text-red-600 font-semibold">
                            Product not found
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6 ">
                            <ProductDetails
                                name={selectedVariety?.name}
                                description={selectedVariety?.description}
                                image={selectedVariety?.image}
                                minQuantity={selectedVariety?.minQuantity}
                                quantityUnit={selectedVariety?.quantityUnit}
                                type={selectedVariety?.type} stock={selectedVariety?.stock}
                                shelfLife={selectedVariety?.shelfLife}
                                avgRating={getAverageRating(selectedVariety?.reviews)}
                                reviewsLength={selectedVariety?.reviews?.length}
                                nutrition={selectedVariety?.nutrition}
                                likes={selectedVariety?.likes}
                                price={selectedVariety?.price}
                            />
                        </div>
                    )
                }
            </section>

            {
                (relatedProducts?.length > 0) && <section className="px-3 md:px-6 pb-6 md:pb-10 md:max-w-6xl mx-auto">
                    <h1 className="border-t border-dashed border-gray-500/50 pb-2 pt-5 text-xl font-semibold">Related Product</h1>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
                        {currentItems.map((product, idx) => (
                            <div
                                key={idx * 0.5}
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
                            </div>
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

                </section>
            }

            {
                (selectedVariety) && <section className="px-3 md:px-6 py-6 md:py-10 md:max-w-6xl mx-auto">
                    <h1 className="border-t border-dashed border-gray-500/50 pb-2 pt-5 text-xl font-semibold">Product Reviews</h1>

                    <ReviewSection reviews={selectedVariety?.reviews} />
                </section>
            }
        </>
    )
}