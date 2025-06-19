import React from "react";

export default function SingleOrder({ order }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-500/20 text-gray-800 dark:text-white rounded-xl p-6 shadow-md w-full max-w-6xl mx-auto space-y-4">
      <div className="flex items-center gap-4">
        <img
          src={order.userPhoto}
          alt={order.customerName}
          className="w-12 h-12 rounded-full object-cover border"
        />
        <div>
          <p className="font-semibold">{order.customerName}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">{order.phone}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Order ID: #{order.id}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-300">{new Date(order.date).toLocaleString()}</p>
      </div>

      <div>
        <h3 className="font-semibold">Customer Details</h3>
        <p><strong>Name:</strong> {order.customerName}</p>
        <p><strong>Phone:</strong> {order.phone}</p>
        <p><strong>Address:</strong> {order.address}</p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Order Items</h3>
        <table className="w-full text-sm border rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="p-2 text-left">Product ID</th>
              <th className="p-2 text-left">Product</th>
              <th className="p-2 text-left">Quantity</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx} className="border-t dark:border-gray-600">
                <td className="p-2">{item.productId}</td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">₹{item.price}</td>
                <td className="p-2">₹{item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <div className="flex justify-between items-center pt-4">
        <div className="text-lg font-semibold">
          Total Amount: ₹{order.items.reduce((total, item) => total + item.price * item.quantity, 0)}
        </div>
        <div className="space-x-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">Accept</button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">Reject</button>
        </div>
      </div>
    </div>
  );
}
