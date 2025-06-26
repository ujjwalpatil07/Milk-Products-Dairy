import { useMemo, useState, createContext, useEffect } from "react";
import { getProducts } from "../services/productServices";
import { toast } from "react-toastify";
import { socket } from "../socket/socket";

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

    const updateProducts = ({ updatedData }) => {

        const updateMap = new Map();
        updatedData.forEach((u) => {
            updateMap.set(u.productId, u.change);
        });

        setProducts((prevProducts) =>
            prevProducts.map((product) => {
                const change = updateMap.get(product?._id)
                if (change !== undefined) {
                    const updatedStock = Math.max(product.stock + change, 0);
                    const updatedSoldQuantity = product.totalQuantitySold + (-1 * change)
                    return {
                        ...product,
                        stock: updatedStock,
                        totalQuantitySold: updatedSoldQuantity
                    };
                }
                return product;
            })
        );
    }

    const handleAddReviewSuccess = ({ review, productId }) => {

        setProducts((prevProducts) => {
            return prevProducts.map((p) => {
                if (p._id === productId) {
                    return {
                        ...p,
                        reviews: [...(p.reviews || []), review],
                    }
                }
                return p;
            })
        });
    }

    const removeReviewFromProduct = (product, productId, reviewId) => {
        if (product._id !== productId) return product;

        const updatedReviews = (product.reviews || []).filter(
            (review) => review._id !== reviewId
        );

        return { ...product, reviews: updatedReviews };
    };

    const handleRemoveReviewSuccess = ({ productId, reviewId }) => {
        setProducts((prevProducts) => {
            return prevProducts.map((product) =>
                removeReviewFromProduct(product, productId, reviewId)
            );
        });
    };

    useEffect(() => {
        socket.on("product-stock-update", updateProducts);
        socket.on("review:add-success", handleAddReviewSuccess);
        socket.on("review:remove-success", handleRemoveReviewSuccess);

        return () => {
            socket.off("product-stock-update", updateProducts);
            socket.off("review:add-success", handleAddReviewSuccess);
            socket.off("review:remove-success", handleRemoveReviewSuccess);

        }
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