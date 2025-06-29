import React from "react";
import { TrendingUp, CreditCard, ShoppingBag } from "lucide-react";

const cards = [
  {
    label: "Total Orders",
    value: 320,
    description: "Completed this month",
    icon: <ShoppingBag className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    color: "bg-blue-100 dark:bg-blue-700/20",
  },
  {
    label: "Total Revenue",
    value: "₹1,20,000",
    description: "Gross revenue generated",
    icon: <CreditCard className="w-6 h-6 text-green-600 dark:text-green-400" />,
    color: "bg-green-100 dark:bg-green-700/20",
  },
  {
    label: "Total Profit",
    value: "₹45,000",
    description: "Net profit after expenses",
    icon: <TrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />,
    color: "bg-yellow-100 dark:bg-yellow-700/20",
  },
];

export default function SummaryCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {cards.map((card, index) => (
        <div
          key={index * 0.9}
          className={`p-5 rounded-xl shadow-sm border dark:border-gray-600 ${card.color} transition-all hover:shadow-md`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-inner">
              {card.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {card.label}
            </h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{card.description}</p>
        </div>
      ))}
    </div>
  );
}
