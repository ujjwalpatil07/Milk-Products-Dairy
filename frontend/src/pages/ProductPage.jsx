import { useParams } from "react-router-dom";

import { products } from "../data/products";
import ProductCard from "../components/ProductComponents/ProductCard";
import { filterProducts } from "../utils/filterData";
import ProductList from "../components/ProductComponents/ProductList";
import SearchProducts from "../components/ProductComponents/SearchProducts";

export default function ProductPage() {

    const { productId } = useParams();

    const filteredProducts = filterProducts(products, productId)

    return (
        <>

            <SearchProducts />

            <div className="w-full px-3 md:px-8 py-3 flex flex-col sm:flex-row md:gap-3">

                <div className="hidden md:block w-60 p-4 h-fit bg-white dark:bg-gray-500/20 rounded-lg shadow-sm transition-colors duration-500">
                    <ProductList />
                </div>

                <div className="flex-1 space-y-5">

                    <section className="w-full">
                        {filteredProducts.length === 0 ? (
                            <div className="text-center text-gray-500 dark:text-gray-300 py-25">
                                No products found matching your search/filter.
                            </div>
                        ) : (
                            filteredProducts.map((product, index) => (
                                <ProductCard key={index * 0.9} product={product} />
                            ))
                        )}
                    </section>

                    <section className="px-3 md:px-6">
                        <h2 className="text-lg font-semibold py-2 border-t border-dashed border-gray-500/50">Recommended</h2>
                        {/* recommended content */}
                    </section>

                    <section className="px-3 md:px-6">
                        <h2 className="text-lg font-semibold py-2 border-t border-dashed border-gray-500/50">Most Reviews & Likes</h2>
                        {/* top liked content */}
                    </section>

                </div>
            </div>

        </>
    );
}
