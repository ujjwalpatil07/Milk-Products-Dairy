import React from "react";
import { FileTextIcon, EyeIcon } from "lucide-react";

const recentInvoices = [
  {
    invoiceId: "INV-00123",
    customerName: "Rahul Sharma",
    orderId: "ORD-1234",
    amount: 250,
    date: "2025-06-22T10:10:00Z",
    status: "Paid",
  },
  {
    invoiceId: "INV-00122",
    customerName: "Sneha Patil",
    orderId: "ORD-1233",
    amount: 180,
    date: "2025-06-21T14:25:00Z",
    status: "Pending",
  },
  {
    invoiceId: "INV-00121",
    customerName: "Amit Joshi",
    orderId: "ORD-1232",
    amount: 350,
    date: "2025-06-20T08:30:00Z",
    status: "Overdue",
  },
];

const statusColors = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Overdue: "bg-red-100 text-red-700",
};

export default function InvoicesPreview() {
  return (
    <div className="bg-white dark:bg-gray-500/20 p-5 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        📄 Recent Invoices
      </h2>

      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700">
              <th className="px-3 py-2">Invoice ID</th>
              <th className="px-3 py-2">Customer</th>
              <th className="px-3 py-2">Order ID</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentInvoices.map((invoice, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30"
              >
                <td className="px-3 py-2 font-medium text-yellow-600 dark:text-yellow-500/50">
                  {invoice.invoiceId}
                </td>
                <td className="px-3 py-2">{invoice.customerName}</td>
                <td className="px-3 py-2 text-green-600 dark:text-green-500/50">{invoice.orderId}</td>
                <td className="px-3 py-2 font-semibold">₹{invoice.amount}</td>
                <td className="px-3 py-2">
                  {new Date(invoice.date).toLocaleDateString()}
                </td>
                <td className="px-3 py-2">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[invoice.status]}`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <button className="flex items-center text-blue-600 hover:underline">
                    <EyeIcon size={16} className="mr-1" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
