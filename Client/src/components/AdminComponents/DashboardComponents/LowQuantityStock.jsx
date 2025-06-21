import React, { useEffect, useState } from "react";

export default function LowQuantityStock({ fetchedProducts }) {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    if (fetchedProducts) {
      const lowStock = fetchedProducts?.filter((p) => p.stock < p.thresholdVal)
        .sort((a, b) => (a.stock - a.thresholdVal) - (b.stock - b.thresholdVal));

      const sufficientStock = fetchedProducts?.filter((p) => p.stock >= p.thresholdVal)
        .sort((a, b) => (a.stock - a.thresholdVal) - (b.stock - b.thresholdVal));
      const sortedAllProducts = [...lowStock, ...sufficientStock];

      setProducts(sortedAllProducts);
    }

  }, [fetchedProducts]);

  return (
    <div className="w-full bg-white dark:bg-gray-500/20 rounded-sm p-3">
      <div className="flex justify-between px-2">
        <h2 className="text-lg font-semibold">Low Quantity Stocks</h2>
        <button className="text-blue-600">See all</button>
      </div>


      <div className="space-y-4 mt-5">
        {products.length === 0 ? (
          <p className="text-center text-gray-500">All products are above threshold.</p>
        ) : (
          products.map((product, index) => (
            <div
              key={index * 0.5}
              className="flex items-center bg-white shadow-md rounded p-3 space-x-4 dark:bg-gray-500/20"
            >
              <img
                src={product.image?.[0] || "/placeholder.jpg"}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h4 className="text-base font-semibold text-gray-800 dark:text-white">
                  {product.name}
                </h4>
                <h5
                  className={`text-sm ${product.stock < product.thresholdVal
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-600 dark:text-gray-300"
                    }`}
                >
                  Remaining Stock: {product.stock} {product.quantityUnit}
                </h5>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Threshold: {product.thresholdVal} {product.quantityUnit}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
