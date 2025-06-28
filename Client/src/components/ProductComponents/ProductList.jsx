import { useNavigate, useParams } from "react-router-dom";
import CategoryIcon from '@mui/icons-material/Category';
import { slugify } from "../../utils/slugify";
import { useContext, useMemo } from "react";
import { ProductContext } from "../../context/ProductProvider";
import { groupProductsByCategory } from "../../utils/groupProductsByCategory";

export default function ProductList() {
    const { products } = useContext(ProductContext);
    const navigate = useNavigate();
    const { productId } = useParams();

    const groupedProducts = useMemo(() => groupProductsByCategory(products), [products]);

    return (
        <>
            <div className="mb-2 pb-2 border-b border-gray-500/50 flex justify-between items-center text-gray-800 dark:text-gray-100">
                <h2 className="text-xl font-semibold">Our Products</h2>
                <CategoryIcon sx={{ fontSize: "1.3rem" }} />
            </div>

            <ul className="space-y-2">
                <li key="all">
                    <button
                        onClick={() => navigate("/products")}
                        className={`w-full text-left px-2 py-1 rounded-md hover:bg-blue-100 dark:hover:bg-gray-700 transition ${!productId ? "text-white bg-[#843E71] font-semibold" : "text-gray-700 dark:text-gray-200"}`}
                    >
                        All
                    </button>
                </li>

                {Object.entries(groupedProducts).map(([category, products]) => {
                    const isAnyProductSelected = products.some(product => slugify(product.name) === productId);

                    return (
                        <li key={category}>
                            <h3
                                className={`mb-1 pe-2 py-1 line-clamp-2 
                                    ${isAnyProductSelected
                                        ? "text-[#843E71]"
                                        : "text-gray-600 dark:text-gray-300"
                                    }`}
                            >
                                {category}
                            </h3>
                            <ul>
                                {products.map((product) => {
                                    const slug = slugify(product.name);
                                    const isSelected = slug === productId;

                                    return (
                                        <li key={product._id}>
                                            <button
                                                onClick={() => navigate(`/products/${slug}`)}
                                                className={`w-full text-left px-2 py-1 rounded-e-md hover:bg-blue-100 dark:hover:bg-gray-700 transition line-clamp-1 border-s border-dashed 
                                                    ${isSelected
                                                        ? "text-white bg-[#843E71] border-[#843E71]"
                                                        : "text-gray-700 dark:text-gray-200 border-gray-500"
                                                    }`}
                                            >
                                                {product.name}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
