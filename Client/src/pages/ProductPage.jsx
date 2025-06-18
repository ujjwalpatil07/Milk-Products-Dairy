import { useParams } from "react-router-dom";

import ProductVarietyCart from "../components/ProductComponents/ProductVarietyCard";
import { getTopProductsByReviewsAndLikes, recommendProducts, searchProducts, sortProducts } from "../utils/filterData";
import ProductList from "../components/ProductComponents/ProductList";
import SearchProducts from "../components/ProductComponents/SearchProducts";
import RecommendedCard from "../components/ProductComponents/RecommendedCard";
import { getAverageRating } from "../utils/averageRating";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductProvider";
import { getProducts } from "../services/productServices";
import { getRandomImage } from "../utils/imagePicker";

export default function ProductPage() {

    const { productId } = useParams();
    const { filter } = useContext(ProductContext);

    const [loading, setLoading] = useState(true);
    const [fetchedProducts, setFetchedProducts] = useState();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const dbProducts = await getProducts();
                setFetchedProducts(Array.isArray(dbProducts?.products) ? dbProducts.products : []);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [productId]);

    const [visibleCount, setVisibleCount] = useState(5);
    const [visibleCount1, setVisibleCount1] = useState(3);

    const filteredProducts = searchProducts(fetchedProducts ?? [], productId);
    const recommendedProducts = recommendProducts(fetchedProducts ?? [], productId);
    const topProducts = getTopProductsByReviewsAndLikes(filteredProducts ?? []);
    const sortedFilteredProducts = sortProducts(filteredProducts ?? [], filter);

    return (
        <>
            <SearchProducts />

            <div className="w-full px-3 lg:px-8 py-3 flex flex-col sm:flex-row md:gap-5">

                <div className="hidden md:block w-60 p-4 h-fit bg-white dark:bg-gray-500/20 rounded-lg shadow-sm transition-colors duration-500">
                    <ProductList />
                </div>

                <div className="flex-1 space-y-5">
                    {loading ? (
                        <div className="w-full flex justify-center text-gray-500 dark:text-gray-300 py-16 text-lg">
                            <div className="w-fit flex items-center gap-3">
                                <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-[#843E71]"></div>
                                <p>Loading...</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <section className="w-full lg:px-6">
                                {(sortedFilteredProducts?.length ?? 0) === 0 ? (
                                    <div className="py-20 text-center">No products found matching your search/filter.</div>
                                ) : (
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-5 border-b border-dashed border-gray-500/50">
                                        {sortedFilteredProducts.map((product, index) => (
                                            <ProductVarietyCart
                                                key={product?._id || index}
                                                id={product?._id}
                                                image={getRandomImage(product?.image || []) || null} 
                                                name={product?.name || "Unnamed Product"}
                                                rating={getAverageRating(product?.reviews || []) || 0}
                                                likes={Array.isArray(product?.likes) ? product.likes : []}
                                                type={product?.type || "Unknown"}
                                                price={product?.price || 0}
                                                minQuantity={product?.minQuantity || 1}
                                                stock={product?.stock || 0}
                                                quantityUnit={product?.quantityUnit || "unit"}
                                            />
                                        ))}
                                    </div>
                                )}
                            </section>

                            {recommendedProducts?.length > 0 && (
                                <section className="pt-10 lg:px-6">
                                    <h2 className="text-lg font-semibold py-2">Recommended</h2>

                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-5">
                                        {recommendedProducts.slice(0, visibleCount).map((variety, idx) => (
                                            <RecommendedCard
                                                key={variety?._id || idx}
                                                id={variety._id}
                                                image={variety?.image?.[0] || ""}
                                                name={variety?.name || "Unknown Product"}
                                                description={variety?.description || "No description"}
                                                likes={variety?.likes || []}
                                                rating={getAverageRating(variety?.reviews || [])}
                                            />
                                        ))}
                                    </div>

                                    {visibleCount < recommendedProducts.length && (
                                        <div className="text-center pt-4">
                                            <button
                                                onClick={() => setVisibleCount(prev => prev + 5)}
                                                className="bg-[#213448] text-white px-6 py-2 rounded-full shadow-md transition cursor-pointer"
                                            >
                                                Load More
                                            </button>
                                        </div>
                                    )}
                                </section>
                            )}

                            {topProducts?.length > 0 && (
                                <section className="lg:px-6 ">
                                    <h2 className={`text-lg font-semibold ${recommendedProducts?.length > 0 && "border-t border-dashed border-gray-500/50 pt-5"}`}>
                                        Most Reviews & Likes
                                    </h2>

                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 py-4">
                                        {topProducts.slice(0, visibleCount1).map((variety, idx) => (
                                            <RecommendedCard
                                                key={variety?._id || idx}
                                                id={variety._id}
                                                image={variety?.image?.[0] || ""}
                                                name={variety?.name || "Unnamed"}
                                                description={variety?.description || "No description available"}
                                                likes={variety?.likes ?? []}
                                                rating={getAverageRating(variety?.reviews ?? [])}
                                            />
                                        ))}
                                    </div>

                                    {visibleCount1 < topProducts.length && (
                                        <div className="text-center pt-4">
                                            <button
                                                onClick={() => setVisibleCount1(prev => prev + 3)}
                                                className="bg-[#213448] text-white px-6 py-2 rounded-full shadow-md transition cursor-pointer"
                                            >
                                                Load More
                                            </button>
                                        </div>
                                    )}
                                </section>
                            )}
                        </>
                    )}
                </div>

            </div>

            <br />
            <br />
        </>
    );
}
