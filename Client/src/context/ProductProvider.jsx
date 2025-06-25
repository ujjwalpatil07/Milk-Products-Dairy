import { useMemo, useState, createContext, useEffect } from "react";
import { getProducts } from "../services/productServices";
import { toast } from "react-toastify";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const [filter, setFilter] = useState("Sort By");
    const [showHeaderExtras, setShowHeaderExtras] = useState(false);
    const [products, setProducts] = useState([]);
    const [productLoading, setProductLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                if (data?.success) {
                    setProducts(data.products);
                }
            } catch (error) {
                toast.error(error?.response?.data?.message || "Error fetching products");
            } finally {
                setProductLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const contextValue = useMemo(() => ({
        filter,
        showHeaderExtras,
        products,
        productLoading,
        setFilter,
        setShowHeaderExtras,
        setProducts,
        setProductLoading
    }), [filter, showHeaderExtras, products, productLoading]);

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    )
}

ProductContext.proptypes = {

}