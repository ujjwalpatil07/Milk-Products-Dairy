import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
// Animation Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function TopSellingStock({ topSellingStocks }) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-500/20 rounded p-3 shadow-md"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Top Selling Stock
      </h2>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full table-auto text-left border-collapse">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400 border-b dark:border-gray-700">
              <th className="py-3 px-4">Product Name</th>
              <th className="py-3 px-4">Total Quantity Sold</th>
              <th className="py-3 px-4">Stock Remaining</th>
              <th className="py-3 px-4">Current Price</th>
              <th className="py-3 px-4">Discount</th>
            </tr>
          </thead>

          <motion.tbody
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {topSellingStocks.map((product, index) => {
              const isLowStock = product.stock < product.thresholdVal;
              return (
                <motion.tr
                  key={index}
                  variants={rowVariants}
                  className={`${isLowStock ? "bg-red-100 dark:bg-red-800/30 animate-pulse" : ""
                    } text-sm text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
                >
                  <td className="py-3 px-4 font-medium">{product?.name}</td>
                  <td className="py-3 px-4">
                    {product?.totalQuantitySold} {product?.quantityUnit}
                  </td>
                  <td className="py-3 px-4">
                    {product?.stock} {product?.quantityUnit}
                  </td>
                  <td className="py-3 px-4">₹ {product?.price}</td>
                  <td className="py-3 px-4">{product?.discount} &#37;</td>
                </motion.tr>
              );
            })}
          </motion.tbody>
        </table>
      </div>
    </motion.div>
  );
}
