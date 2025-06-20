import React, { useState } from "react";

const initialPayments = [
  {
    id: 1,
    customer: "John Doe",
    product: "Milk - 2 Liters",
    amount: 50,
    date: "2025-05-25",
    status: "Pending",
  },
  {
    id: 2,
    customer: "Jane Smith",
    product: "Butter - 1 Kg",
    amount: 120,
    date: "2025-05-26",
    status: "Completed",
  },
  {
    id: 3,
    customer: "Rahul Kumar",
    product: "Cheese - 500 g",
    amount: 200,
    date: "2025-05-27",
    status: "Pending",
  },
];


export default function Payments() {
  const [payments, setPayments] = useState(initialPayments);

  const toggleStatus = (id) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "Pending" ? "Completed" : "Pending" }
          : p
      )
    );
  };

  const deletePayment = (id) => {
    setPayments((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Payments</h1>

      {/* Table for large screens */}
      <div className="hidden md:block">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Amount (₹)</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{p.customer}</td>
                <td className="py-3 px-4">{p.product}</td>
                <td className="py-3 px-4">{p.amount}</td>
                <td className="py-3 px-4">{p.date}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${p.status === "Completed"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                      }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => toggleStatus(p.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Toggle Status
                  </button>
                  <button
                    onClick={() => deletePayment(p.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for small screens */}
      <div className="md:hidden space-y-4">
        {payments.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between mb-2">
              <h2 className="font-semibold text-lg">{p.customer}</h2>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${p.status === "Completed"
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                  }`}
              >
                {p.status}
              </span>
            </div>
            <p>
              <span className="font-semibold">Product:</span> {p.product}
            </p>
            <p>
              <span className="font-semibold">Amount:</span> ₹{p.amount}
            </p>
            <p>
              <span className="font-semibold">Date:</span> {p.date}
            </p>
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => toggleStatus(p.id)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1 rounded"
              >
                Toggle Status
              </button>
              <button
                onClick={() => deletePayment(p.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
