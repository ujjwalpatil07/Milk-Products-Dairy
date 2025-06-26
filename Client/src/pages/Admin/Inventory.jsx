import React, { useState, useEffect } from "react";
import OverallInventory from "../../components/AdminComponents/InventoryComponents/OverallInventory";
import ProductsList from "../../components/AdminComponents/InventoryComponents/ProductsList";
import { getProducts } from "../../services/productServices";
import {
  getExpiryStatusCounts,
  lowStockCount,
  outOfStockProducts,
  totalCategories,
  totalStock,
} from "../../services/inventoryServices";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
};

export default function Inventory() {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const dbProducts = await getProducts();
      setFetchedProducts(dbProducts?.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const { expiredCount, expiringSoonCount } = getExpiryStatusCounts(fetchedProducts);

  return (
    <>
      <motion.div
        className="p-3"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={0.1}
      >
        <OverallInventory
          totalCategories={totalCategories(fetchedProducts)}
          totalStock={totalStock(fetchedProducts)}
          lowStockCount={lowStockCount(fetchedProducts)}
          outOfStockProducts={outOfStockProducts(fetchedProducts)}
          expiringSoonCount={expiringSoonCount}
          expiredCount={expiredCount}
        />
      </motion.div>

      <motion.div
        className="p-3"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={0.3}
      >
        <ProductsList
          fetchProducts={fetchProducts}
          fetchedProducts={fetchedProducts}
          loading={loading}
        />
      </motion.div>
    </>
  );
}
