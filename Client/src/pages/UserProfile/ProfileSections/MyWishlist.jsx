import React from "react";
import { useState, useEffect } from "react";

export default function MyWishlist() {
  const [wishlist, setWishlist] = useState([
    {
      name: "Fresh Cow Milk - 1L",
      price: 55,
      image: "/images/products/cow-milk.png"
    },
    {
      name: "Paneer - 200g",
      price: 90,
      image: "/images/products/paneer.png"
    },
    {
      name: "Greek Yogurt - 500g",
      price: 120,
      image: "/images/products/yogurt.png"
    }
  ]);
  
  return (
    <div className="w-full max-w-5xl mx-auto bg-white shadow-md rounded p-6">
      <h3 className="text-xl font-semibold mb-6">My Wishlist</h3>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((item, idx) => (
            <div key={idx} className="border rounded-lg p-4 shadow-sm flex flex-col justify-between">
              <img src={item.image} alt={item.name} className="h-40 object-contain mx-auto mb-4" />
              <h4 className="font-semibold text-lg">{item.name}</h4>
              <p className="text-gray-600 mt-1 mb-2">₹{item.price}</p>
              <div className="flex justify-between items-center mt-auto">
                <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1 rounded text-sm">Add to Cart</button>
                <button className="text-red-500 hover:text-red-700 text-sm">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
;
}
