import InventorySummary from "../../components/AdminComponents/DashboardComponents/InventorySummary";
import PurchaseOverview from "../../components/AdminComponents/DashboardComponents/PurchaseOverview";
import SalesOverview from "../../components/AdminComponents/DashboardComponents/SalesOverview";
import { ProductsStock } from "../../components/AdminComponents/DashboardComponents/ProductsStock";
import Statistics from "../../components/AdminComponents/DashboardComponents/Statastics";
import LowQuantityStock from "../../components/AdminComponents/DashboardComponents/LowQuantityStock";
import TopSellingStock from "../../components/AdminComponents/DashboardComponents/TopSellingStock";
import { getExpiryStatusCounts, lowStockCount, outOfStockProducts, totalStock } from "../../services/inventoryServices";
import { getProducts } from "../../services/productServices";
import { useState, useEffect } from "react";

export default function Dashboard() {

    const [fetchedProducts, setFetchedProducts] = useState([])
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;


    const fetchProducts = async () => {
        try {
            const dbProducts = await getProducts();

            setFetchedProducts(dbProducts?.products);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    const totalProducts = fetchedProducts?.length

    const stockCount = totalStock(fetchedProducts)

    const lowStockProducts = lowStockCount(fetchedProducts)

    const outOfStockCount = outOfStockProducts(fetchedProducts)

    const { expiredCount, expiringSoonCount } = getExpiryStatusCounts(fetchedProducts);


    return (
        <>
            <section className="p-3">
                <SalesOverview />
            </section>

            <section className="flex flex-col md:flex-row gap-4 p-3">
                {/* Left Column (Inventory + Purchase) */}
                <section className="flex flex-col gap-4 w-full md:max-w-3xl">
                    <div className="w-full">
                        <InventorySummary
                            totalProducts={totalProducts}
                            totalStock={stockCount}
                            lowStockCount={lowStockProducts}
                            outOfStockProducts={outOfStockCount}
                            expiringSoonCount={expiringSoonCount}
                            expiredCount={expiredCount}
                        />
                    </div>

                    <div className="w-full">
                        <PurchaseOverview />
                    </div>

                    <div className="w-full">
                        <Statistics />
                    </div>

                    <div className="w-full">
                        <TopSellingStock />
                    </div>
                </section>

                {/* Right Column (Products Stock + Placeholder) */}
                <section className="flex flex-col gap-4 w-full md:w-2/5 md:max-w-xl">
                    <div className="w-full">
                        <ProductsStock fetchedProducts={fetchedProducts} darkMode={isDarkMode} />
                    </div>

                    <div className="w-full">
                        <LowQuantityStock />
                    </div>
                </section>
            </section>

        </>
    )
}