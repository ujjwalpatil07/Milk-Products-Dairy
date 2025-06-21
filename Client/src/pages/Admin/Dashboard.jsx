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

            <section className="w-full flex flex-col md:flex-row gap-4 p-3">
                <section className="flex-1 flex flex-col gap-4">
                    <InventorySummary
                        totalProducts={totalProducts}
                        totalStock={stockCount}
                        lowStockCount={lowStockProducts}
                        outOfStockProducts={outOfStockCount}
                        expiringSoonCount={expiringSoonCount}
                        expiredCount={expiredCount}
                    />

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

                <section className="flex flex-col gap-4 md:w-80">
                    <div className="w-full">
                        <ProductsStock fetchedProducts={fetchedProducts} />
                    </div>

                    <div className="w-full">
                        <LowQuantityStock fetchedProducts={fetchedProducts} />
                    </div>
                </section>
            </section>

        </>
    )
}