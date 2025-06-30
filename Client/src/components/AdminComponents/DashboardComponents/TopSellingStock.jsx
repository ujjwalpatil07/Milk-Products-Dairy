import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import PropTypes from "prop-types"
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

export default function TopSellingStock({ topSellingStocks, loading }) {


  if (topSellingStocks?.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-500/20 rounded p-3 shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Top Selling Stock
        </h2>
        <p
          colSpan={5}
          className="py-6 px-4 text-center text-gray-500 dark:text-gray-400"
        >
          No top selling products available.
        </p>
      </div>
    )
  }

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

      <div className="w-full overflow-x-auto scrollbar-hide">
        <table className="min-w-full table-auto text-left border-collapse">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
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
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                <tr
                  key={index * 0.5}
                  className="animate-pulse text-sm text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600/20 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </td>
                </tr>
              ))
              : topSellingStocks.map((product, index) => {
                const isLowStock = product?.stock < product?.thresholdVal;
                return (
                  <motion.tr
                    key={index * 0.9}
                    variants={rowVariants}
                    className={`${isLowStock ? "bg-red-100 dark:bg-red-800/30 animate-pulse" : ""
                      } text-sm text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600/20 transition-colors`}
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


TopSellingStock.propTypes = {
  topSellingStocks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      totalQuantitySold: PropTypes.number,
      quantityUnit: PropTypes.string,
      stock: PropTypes.number,
      thresholdVal: PropTypes.number,
      price: PropTypes.number,
      discount: PropTypes.number,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired
};