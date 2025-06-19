import React from "react";

export default function LowQuantityStock() {
  const lowStockProducts = [
    {
      name: "Paneer",
      photo: "https://res.cloudinary.com/dyahibuzy/image/upload/v1750157396/paneer_lnj9jf.jpg",
      remainingStock: 5,
    },
    {
      name: "Butter",
      photo: "https://res.cloudinary.com/dyahibuzy/image/upload/v1750157358/butter_qhvv0q.jpg",
      remainingStock: 3,
    },
    {
      name: "Ghee (Clarified Butter)",
      photo: "https://res.cloudinary.com/dyahibuzy/image/upload/v1750157372/ghee_yuhqxs.jpg",
      remainingStock: 8,
    },
    {
      name: "Lassi",
      photo: "https://res.cloudinary.com/dyahibuzy/image/upload/v1750157381/lassi_pbyivh.jpg",
      remainingStock: 2,
    },
    {
      name: "Milk Powder",
      photo: "https://res.cloudinary.com/dyahibuzy/image/upload/v1750157394/milkPowder_ptnc9l.jpg",
      remainingStock: 7,
    }
  ];
  
  return (
    <div className="w-full  bg-white dark:bg-gray-500/20 rounded-sm p-4">
      <div className="flex justify-between px-2">
        <h2 className="text-lg font-semibold">Low Quantity Stocks</h2>
        <button className="text-blue-600">See all</button>
      </div>

      <div className="space-y-4 mt-5">
        {lowStockProducts.map((product, index) => (
          <div
            key={index}
            className="flex items-center bg-white shadow-md rounded-xl p-3 space-x-4 dark:bg-gray-500/20"
          >
            <img
              src={product.photo}
              alt={product.name}
              className="w-15 h-15 object-cover rounded-md border"
            />
            <div className="">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                {product.name}
              </h4>
              <h5 className="text-sm text-gray-600 dark:text-gray-300">
                Remaining Stock: {product.remainingStock} {product.unit}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
