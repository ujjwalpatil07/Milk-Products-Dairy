import React from "react";

const topSellingData = [
  { name: "Paneer", sold: 45454, remaining: 78, price: 4500 },
  { name: "Ghee", sold: 798, remaining: 789, price: 450 },
  { name: "Khoya", sold: 7998, remaining: 454, price: 230 },
  { name: "Paneer", sold: 45454, remaining: 78, price: 4500 },
  { name: "Ghee", sold: 798, remaining: 789, price: 450 },
  { name: "Khoya", sold: 7998, remaining: 454, price: 230 },
];

export default function TopSellingStock() {
  return (
    <div className="bg-white dark:bg-gray-500/20 rounded p-3 shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Top Selling Stock</h2>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full table-auto text-left border-collapse">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400 border-b dark:border-gray-700">
              <th className="py-3 px-4">Product Name</th>
              <th className="py-3 px-4">Sold</th>
              <th className="py-3 px-4">Remaining</th>
              <th className="py-3 px-4">Price</th>
            </tr>
          </thead>
          <tbody>
            {topSellingData.map((product, index) => (
              <tr
                key={index * 0.5}
                className="text-sm text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="py-3 px-4 font-medium">{product.name}</td>
                <td className="py-3 px-4">{product.sold}</td>
                <td className="py-3 px-4">{product.remaining}</td>
                <td className="py-3 px-4">₹ {product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
