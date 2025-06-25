import InventorySummary from "../../components/AdminComponents/DashboardComponents/InventorySummary";
import SalesOverview from "../../components/AdminComponents/DashboardComponents/SalesOverview";
import { ProductsStock } from "../../components/AdminComponents/DashboardComponents/ProductsStock";
import Statistics from "../../components/AdminComponents/DashboardComponents/Statastics";
import LowQuantityStock from "../../components/AdminComponents/DashboardComponents/LowQuantityStock";
import TopSellingStock from "../../components/AdminComponents/DashboardComponents/TopSellingStock";
import { getExpiryStatusCounts, lowStockCount, outOfStockProducts, totalStock } from "../../services/inventoryServices";
import { getProducts } from "../../services/productServices";
import { useState, useEffect } from "react";
import OrdersOverview from "../../components/AdminComponents/DashboardComponents/PurchaseOverview";
import { getAllOrders, totalActiveOrders } from "../../services/orderService";
import { toast } from "react-toastify";
import { calculateTotalProfit, getTotalRevenue, topSellingStocks } from "../../services/dashboardServices";

export default function Dashboard() {

    const [fetchedProducts, setFetchedProducts] = useState([])
    const [allOrders, setAllOrders] = useState([]);

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

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const res = await getAllOrders();
                if (res?.success) {
                    setAllOrders(res?.orders);
                }
            } catch (error) {
                console.log(error)
                toast.error(error?.response?.data?.message || "Failed to fetch orders, please try again!");
            }
        };

        fetchAllOrders();
    }, []);

    // if(allOrders.length > 0) {
    //     console.log(allOrders)
    // }

    const { expiredCount, expiringSoonCount } = getExpiryStatusCounts(fetchedProducts);

    return (
        <>
            <section className="p-3">
                <SalesOverview totalRevenue={getTotalRevenue(allOrders)} totalProfit={calculateTotalProfit(allOrders)} />
            </section>

            <section className="w-full flex flex-col md:flex-row gap-4 p-3">
                <section className="flex-1 flex flex-col gap-4">
                    <InventorySummary
                        totalProducts={fetchedProducts?.length}
                        totalStock={totalStock(fetchedProducts)}
                        lowStockCount={lowStockCount(fetchedProducts)}
                        outOfStockProducts={outOfStockProducts(fetchedProducts)}
                        expiringSoonCount={expiringSoonCount}
                        expiredCount={expiredCount}
                    />

                    <div className="w-full">
                        <OrdersOverview
                            totalOrdersRecieved={allOrders?.length}
                            totalPendingOrders={totalActiveOrders(allOrders)}
                        />
                    </div>

                    <div className="w-full">
                        <Statistics />
                    </div>

                    <div className="w-full">
                        <TopSellingStock topSellingStocks={topSellingStocks(fetchedProducts)} />
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