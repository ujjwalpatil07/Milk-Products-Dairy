import { useNavigate, useParams } from "react-router-dom";
import CategoryIcon from '@mui/icons-material/Category';
import { products } from "../../data/products";
import { slugify } from "../../utils/slugify";


export default function ProductList() {

    const navigate = useNavigate();
    const { productId } = useParams();

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

                {products.map((product, idx) => (
                    <li key={idx * 0.8}>
                        <button
                            onClick={() => navigate(`/products/${slugify(product.title)}`)}
                            className={`w-full text-left px-2 py-1 rounded-md hover:bg-blue-100 dark:hover:bg-gray-700 transition ${slugify(product.title) === productId
                                ? "text-white bg-[#843E71] font-semibold"
                                : "text-gray-700 dark:text-gray-200"
                                }`}
                        >
                            {product.title}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}