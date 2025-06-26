import React from 'react';

const cards = [
  { label: 'Total Orders', value: 320, color: 'bg-blue-100', icon: '📦' },
  { label: 'Invoices', value: 275, color: 'bg-green-100', icon: '🧾' },
  { label: 'Customers', value: 95, color: 'bg-yellow-100', icon: '👥' },
];

export default function SummaryCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {cards.map((card, index) => (
        <div key={index * 0.9} className={`p-4 rounded-lg shadow ${card.color}`}>
          <div className="text-2xl">{card.icon}</div>
          <div className="text-sm text-gray-500">{card.label}</div>
          <div className="text-xl font-bold">{card.value}</div>
        </div>
      ))}
    </div>
  );
}
