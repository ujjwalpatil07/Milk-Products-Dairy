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
    <div className="bg-white dark:bg-gray-500/20 rounded-xl p-6 shadow-md w-full overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Top Selling Stock</h2>
      <table className="min-w-full table-auto text-left">
        <thead>
          <tr className="text-gray-600 dark:text-gray-300 text-sm border-b">
            <th className="pb-3">Name</th>
            <th className="pb-3">Sold Quantity</th>
            <th className="pb-3">Remaining Quantity</th>
            <th className="pb-3">Price</th>
          </tr>
        </thead>
        <tbody>
          {topSellingData.map((product, index) => (
            <tr key={index} className="text-gray-800 dark:text-gray-100 text-sm border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <td className="py-3">{product.name}</td>
              <td className="py-3">{product.sold}</td>
              <td className="py-3">{product.remaining}</td>
              <td className="py-3">₹ {product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
