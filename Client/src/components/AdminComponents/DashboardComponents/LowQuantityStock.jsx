import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UpdateProductModel from "../InventoryComponents/Models/UpdateProductModel";

export default function LowQuantityStock({ fetchedProducts }) {

  const [products, setProducts] = useState([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({})

  useEffect(() => {

    if (fetchedProducts) {
      const lowStock = fetchedProducts?.filter((p) => p.stock < p.thresholdVal)
        .sort((a, b) => (a.stock - a.thresholdVal) - (b.stock - b.thresholdVal));

      const sortedAllProducts = [...lowStock];

      setProducts(sortedAllProducts);
    }

  }, [fetchedProducts]);

  return (
    <div className="w-full bg-white dark:bg-gray-500/20 rounded-sm p-3">
      <div className="flex justify-between px-2">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Low Quantity Stocks</h2>
        <button className="text-blue-600 hover:underline text-sm">See all</button>
      </div>

      <div className="space-y-4 mt-5">
        {products.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            All products are above threshold.
          </p>
        ) : (
          products.map((product, index) => (
            <div
              key={index * 0.9}
              className="relative group flex items-center bg-white shadow-md rounded p-3 space-x-4 dark:bg-gray-500/30"
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
                    ? "text-red-600 dark:text-red-500 animate-pulse"
                    : "text-gray-600 dark:text-gray-300"
                    }`}
                >
                  Remaining Stock: {product.stock} {product.quantityUnit}
                </h5>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Threshold: {product.thresholdVal} {product.quantityUnit}
                </p>
              </div>

              {/* Add Stock Button (only on hover) */}
              <button
                onClick={() => {
                  setSelectedProduct(product)
                  setOpenUpdateModal(true)
                } }
                className="absolute top-1.5 right-2 md:hidden md:group-hover:block bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md shadow-md transition"
              >
                Add Stock
              </button>
            </div>
          ))
        )}

        {openUpdateModal && (
          <UpdateProductModel open={openUpdateModal} onClose={() => setOpenUpdateModal(false)} selectedProduct={selectedProduct}/>
        )}
      </div>
    </div>

  );
}

LowQuantityStock.propTypes = {
  fetchedProducts: PropTypes.array
};