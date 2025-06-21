import React from "react";

export default function SingleOrder({ order }) {

  const address = order?.address;
  const owner = address?.owner;
  const products = order?.productsData;

  return (
    <div className="bg-gray-100 dark:bg-gray-500/20 text-gray-800 dark:text-white rounded-xl p-6 shadow-md w-full max-w-6xl mx-auto space-y-4">
      <div className="flex items-center gap-4">
        <img
          src={owner?.photo}
          alt={owner?.firstName}
          className="w-12 h-12 rounded-full object-cover border"
        />
        <div>
          <p className="font-semibold">{owner?.firstName}{owner?.lastName}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">{owner?.mobileNo}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Order ID: #{order._id}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-300">{new Date(order?.createdAt).toLocaleString()}</p>
      </div>

      <div>
        <h3 className="font-semibold">Delivary Details</h3>
        <p><strong>Name:</strong> {address?.name}</p>
        <p><strong>Phone:</strong> {address?.phone}</p>
        <p><strong>Address:</strong> {address?.streetAddress}</p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Order products</h3>
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
            {products.map((product, idx) => (
              <tr key={idx} className="border-t dark:border-gray-600">
                <td className="p-2">{product?.productId._id}</td>
                <td className="p-2">{product?.productId?.name}</td>
                <td className="p-2">{product?.productQuantity}</td>
                <td className="p-2">₹{product?.productPrice}</td>
                <td className="p-2">₹{product?.productQuantity * product?.productPrice}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <div className="flex justify-between items-center pt-4">
        <div className="text-lg font-semibold">
          Total Amount: ₹{products.reduce((total, product) => total + product?.productPrice * product?.productQuantity, 0)}
        </div>
        <div className="space-x-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">Accept</button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">Reject</button>
        </div>
      </div>
    </div>

  );
}