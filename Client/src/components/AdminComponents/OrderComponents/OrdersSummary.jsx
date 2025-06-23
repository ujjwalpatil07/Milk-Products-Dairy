import React from "react";
import { ShoppingCart, BookCheck, Undo2, NotepadTextDashedIcon, Ban } from "lucide-react";
import PropTypes from 'prop-types';

export default function OrdersSummary({ totalOrders, totalRecievedOrders, totalCanceledOrders }) {


  const orderSummaryData = [
    {
      name: "Total Orders",
      value: totalOrders,
      icon: <ShoppingCart size={28} className="text-green-600" />,
      bg: "bg-green-100 dark:bg-green-800/30",
    },
    {
      name: "Total Orders Recieved",
      value: totalRecievedOrders,
      icon: <BookCheck size={28} className="text-yellow-600" />,
      bg: "bg-yellow-100 dark:bg-yellow-800/30",
    },
    {
      name: "Total Returned Orders",
      value: 63,
      icon: <Undo2 size={28} className="text-orange-600" />,
      bg: "bg-orange-100 dark:bg-orange-800/30",
    },
    {
      name: "Total Canceled Orders",
      value: totalCanceledOrders,
      icon: <Ban size={28} className="text-red-600" />,
      bg: "bg-red-100 dark:bg-red-800/30",
    },
    {
      name: "Total Drafted Orders",
      value: 3,
      icon: <NotepadTextDashedIcon size={28} className="text-blue-600" />,
      bg: "bg-blue-100 dark:bg-blue-800/30",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-500/20 rounded-sm p-4">
      <h2 className="text-lg font-semibold mb-4">Orders Overview</h2>

      <div className="flex flex-nowrap overflow-x-auto gap-4 pb-2 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 scrollbar-hide">
        {orderSummaryData.map((item, index) => (
          <div
            key={index * 0.9}
            className={`min-w-[220px] sm:min-w-0 flex items-center gap-4 p-4 rounded-lg ${item.bg}`}
          >
            <div className="text-2xl shrink-0">{item.icon}</div>
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 dark:text-gray-300 break-words">{item.name}</div>
              <div className="text-lg font-bold flex-nowrap whitespace-nowrap text-ellipsis overflow-hidden">
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

OrdersSummary.propTypes = {
  totalOrders : PropTypes.number.isRequired,
  totalRecievedOrders: PropTypes.number.isRequired,
  totalCanceledOrders: PropTypes.number.isRequired
}