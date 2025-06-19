import React from "react";
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { ShoppingCart, BookCheck, Undo2, NotepadTextDashedIcon, Ban  } from "lucide-react";

export default function OrdersSummary() {
  const inventorySummaryData = [
    {
      name: "Total Orders",
      value: 50,
      icon: <ShoppingCart size={ 28} className="text-green-600"/>,
      bg: "bg-green-100 dark:bg-green-800/30",
    },
    {
      name: "Total Orders Recieved",
      value: 41,
      icon: <BookCheck size={28} className="text-yellow-600"/>,
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
      value: 34,
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
      <h2 className="text-lg font-semibold mb-4"> Inventary Summary </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {inventorySummaryData.map((item, index) => (
          <div key={index * 0.5} className={`flex items-center gap-3 p-3 rounded-lg ${item.bg}`}>
            <div className="text-2xl">
              {item.icon}
            </div>
            <div className="flex flex-col items-start ">
              <div className="text-sm text-gray-500 dark:text-gray-300 text-start">{item.name}</div>
              <div className="text-lg font-bold ">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
