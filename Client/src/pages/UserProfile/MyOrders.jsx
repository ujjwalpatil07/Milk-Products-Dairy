import React from "react";

export default function MyOrders() {
  return (
    <div className="w-full max-w-5xl mx-auto bg-white shadow-md rounded p-6">
      <h3 className="text-xl font-semibold mb-4">My Orders</h3>
      {[1, 2].map((orderId, idx) => (
        <div key={idx} className="border rounded p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Order ID: #DAIRY{1000 + idx}</p>
              <p className="font-semibold text-lg">Delivered on: {idx === 0 ? "May 28, 2025" : "May 22, 2025"}</p>
            </div>
            <span className="text-green-600 font-medium">Delivered</span>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {["Milk 500ml", "Paneer 250g", "Curd 1kg"].map((product, pidx) => (
              <div key={pidx} className="flex gap-4 items-center border rounded p-3 bg-gray-50">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPqsGWYeHfMd8pAiXZEc_ykXd84LqPQ35dYoCGo6JwCCG6iPfvFKHwkcvmaLSv37DAU8o&usqp=CAU" alt="Product" className="w-16 h-16 object-cover rounded" />
                <div>
                  <p className="font-semibold">{product}</p>
                  <p className="text-sm text-gray-600">Qty: {pidx + 1}</p>
                  <p className="text-sm text-gray-800">₹{(pidx + 1) * 60}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
