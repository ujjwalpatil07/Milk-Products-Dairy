import React from "react";
import SingleOrder from "./SingleOrder";

export default function OrderDetails() {
  const sampleOrders = [
    {
      id: "ORD123456",
      customerName: "Ujjwal Patil",
      userPhoto: "https://randomuser.me/api/portraits/men/75.jpg",
      phone: "9876543210",
      address: "123 MG Road, Pune, Maharashtra, 411001",
      date: new Date(),
      items: [
        { productId: "P001", name: "Milk", quantity: 2, price: 30 },
        { productId: "P002", name: "Paneer", quantity: 1, price: 120 },
        { productId: "P003", name: "Curd", quantity: 3, price: 25 },
      ],
    },
    {
      id: "ORD789012",
      customerName: "Sneha Kulkarni",
      userPhoto: "https://randomuser.me/api/portraits/women/68.jpg",
      phone: "9123456780",
      address: "456 FC Road, Pune, Maharashtra, 411004",
      date: new Date(),
      items: [
        { productId: "P004", name: "Ghee", quantity: 1, price: 500 },
        { productId: "P005", name: "Butter", quantity: 2, price: 80 },
      ],
    },
    {
      id: "ORD345678",
      customerName: "Rohan Deshmukh",
      userPhoto: "https://randomuser.me/api/portraits/men/33.jpg",
      phone: "9988776655",
      address: "789 JM Road, Pune, Maharashtra, 411005",
      date: new Date(),
      items: [
        { productId: "P006", name: "Lassi", quantity: 4, price: 20 },
        { productId: "P007", name: "Milk", quantity: 1, price: 30 },
      ],
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-500/20 rounded-xl p-6 shadow-md w-full overflow-x-auto flex flex-col gap-y-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 border-b pb-2">
        🧾 Orders Section
      </h2>
      {sampleOrders.map((order, index) => (
        <SingleOrder key={index} order={order} />
      ))}
    </div>
  );
}
