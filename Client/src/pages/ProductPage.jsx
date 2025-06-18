import { useParams } from "react-router-dom";

import { products } from "../data/products";
import ProductCard from "../components/ProductComponents/ProductCard";
import { applySortToFilteredProducts, getTopVarietiesByReviewsAndLikes, recommendProducts, searchProducts } from "../utils/filterData";
import ProductList from "../components/ProductComponents/ProductList";
import SearchProducts from "../components/ProductComponents/SearchProducts";
import RecommendedCard from "../components/ProductComponents/RecommendedCard";
import { getAverageRating } from "../utils/averageRating";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductProvider";

import { getProducts } from "../services/productServices";

export default function ProductPage() {

    const [fetchedProducts, setFetchedProducts] = useState();

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const dbProducts = await getProducts(); // await resolves the Promise
            // console.log(dbProducts.products); // You get actual data here
            setFetchedProducts(dbProducts?.products);
          } catch (err) {
            console.error("Error fetching products:", err);
          }
        };
      
        fetchProducts();
      }, []);

      console.log(fetchedProducts)
    const { productId } = useParams();
    const { filter } = useContext(ProductContext);

    const [visibleCount, setVisibleCount] = useState(5);
    const [visibleCount1, setVisibleCount1] = useState(3);

    const filteredProducts = searchProducts(products, productId);
    const recommendedProducts = recommendProducts(products, productId);
    const topVarieties = getTopVarietiesByReviewsAndLikes(filteredProducts);
    const sortedFilteredProducts = applySortToFilteredProducts(filteredProducts, filter);

    return (
        <>
            <SearchProducts />

            <div className="w-full px-3 lg:px-8 py-3 flex flex-col sm:flex-row md:gap-5">

                <div className="hidden md:block w-60 p-4 h-fit bg-white dark:bg-gray-500/20 rounded-lg shadow-sm transition-colors duration-500">
                    <ProductList />
                </div>

                <div className="flex-1 space-y-5">
                    <section className="w-full">
                        {sortedFilteredProducts.length === 0 ? (
                            <div className="text-center text-gray-500 dark:text-gray-300 py-25">
                                No products found matching your search/filter.
                            </div>
                        ) : (
                            sortedFilteredProducts.map((product, index) => (
                                <ProductCard key={index * 0.9} product={product} />
                            ))
                        )}
                    </section>

                    {(recommendedProducts?.length > 0) && (
                        <section className="pt-10 lg:px-6">
                            <h2 className="text-lg font-semibold py-2">Recommended</h2>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-5">
                                {
                                    recommendedProducts
                                        .slice(0, visibleCount)
                                        .map((variety, idx) => (
                                            <RecommendedCard
                                                key={idx * 0.8}
                                                image={variety?.image?.[0] || ""}
                                                name={variety?.name}
                                                description={variety?.description}
                                                likes={variety?.likes || []}
                                                rating={getAverageRating(variety?.reviews)}
                                            />
                                        ))
                                }
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

                    {(topVarieties?.length > 0) && (<section className="lg:px-6 ">
                        <h2 className={`text-lg font-semibold ${recommendedProducts?.length > 0 && "border-t border-dashed border-gray-500/50 pt-5"}`}>
                            Most Reviews & Likes
                        </h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 py-4">
                            {
                                topVarieties?.slice(0, visibleCount1).map((variety, idx) => (
                                    <RecommendedCard
                                        key={idx * 0.7}
                                        image={variety?.image?.[0] || ""}
                                        name={variety?.name}
                                        description={variety?.description}
                                        likes={variety?.likes || []}
                                        rating={getAverageRating(variety?.reviews)}
                                    />
                                ))
                            }
                        </div>

                        {visibleCount1 < topVarieties?.length && (
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
                </div>
            </div>

            <br />
            <br />
        </>
    );
}
