import React from "react";


export default function TopSellingStock({ topSellingStocks }) {
  return (
    <div className="bg-white dark:bg-gray-500/20 rounded p-3 shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Top Selling Stock</h2>
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
          <tbody>
            {topSellingStocks.map((product, index) => {
              const isLowStock = product.stock < product.thresholdVal;
              return (
                <tr
                  key={index * 0.5}
                  className={`${isLowStock ? "bg-red-100 dark:bg-red-800/30 animate-pulse" : ""}  text-sm text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
                >
                  <td className="py-3 px-4 font-medium">{product?.name}</td>
                  <td className="py-3 px-4">{product?.totalQuantitySold}{" "} {product?.quantityUnit}</td>
                  <td className="py-3 px-4"> {product?.stock} {" "} {product?.quantityUnit} </td>
                  <td className="py-3 px-4">₹ {product?.price}</td>
                  <td className="py-3 px-4">{product?.discount} &#37;</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
