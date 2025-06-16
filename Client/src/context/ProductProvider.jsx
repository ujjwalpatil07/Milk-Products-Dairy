import { createContext, useMemo, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const [filter, setFilter] = useState("Sort By");
    

    const contextValue = useMemo(() => ({
        filter,
        setFilter
    }), [filter]);

    return (
        <ProductContext.Provider value={contextValue}>
            { children }
        </ProductContext.Provider>
    )
}