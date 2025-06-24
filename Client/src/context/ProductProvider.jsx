import {  useMemo, useState, createContext } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const [filter, setFilter] = useState("Sort By");
    const [showHeaderExtras, setShowHeaderExtras] = useState(false);
    const [products, setProducts] = useState([]);
    

    const contextValue = useMemo(() => ({
        filter,
        showHeaderExtras,
        products,
        setFilter,
        setShowHeaderExtras,
        setProducts
    }), [filter, showHeaderExtras, products]);

    return (
        <ProductContext.Provider value={contextValue}>
            { children }
        </ProductContext.Provider>
    )
}

ProductContext.proptypes = {
    
}