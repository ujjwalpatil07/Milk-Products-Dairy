import InventoryIcon from "@mui/icons-material/Inventory";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

import { formatNumberWithCommas } from "../../../utils/format"

export default function InventorySummary({ totalProducts, lowStockCount, outOfStockProducts, expiringSoonCount }) {
  const inventorySummaryData = [
    {
      name: "Total Stock Items",
      value: totalProducts,
      icon: <FormatListNumberedIcon className="text-blue-600" />,
      bg: "bg-blue-100 dark:bg-blue-800/30",
    },
    {
      name: "Low Stock",
      value: lowStockCount,
      icon: <ReportProblemIcon className="text-yellow-600" />,
      bg: "bg-yellow-100 dark:bg-yellow-800/30",
    },
    {
      name: "Out of Stock",
      value: outOfStockProducts,
      icon: <ErrorOutlineIcon className="text-red-600" />,
      bg: "bg-red-100 dark:bg-red-800/30",
    },
    {
      name: "Near Expiry",
      value: expiringSoonCount,
      icon: <AccessTimeIcon className="text-orange-600" />,
      bg: "bg-orange-100 dark:bg-orange-800/30",
    },

  ];
  return (
    <div className="bg-white dark:bg-gray-500/20 rounded-sm p-4">
          <h2 className="text-lg font-semibold mb-4"> Inventary Summary </h2>

      <div className="md:hidden flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {inventorySummaryData.map((item, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-64 max-sm:min-w-full sm:min-w-[300px] flex items-center gap-4 p-4 rounded-lg ${item.bg}`}
          >
            <div className="text-2xl">{item.icon}</div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-300">{item.name}</div>
              <div className="text-lg font-bold">&#8377; {formatNumberWithCommas(item.value)}</div>
            </div>
          </div>
        ))}
      </div>
    
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 max-lg:grid-cols-3 lg:grid-cols-4 gap-3">
            {inventorySummaryData.map((item, index) => (
              <div key={index * 0.5} className={`flex items-center gap-3 p-3 rounded-lg ${item.bg}`}>
                <div className="text-2xl">
                  {item.icon}
                </div>
                <div className="flex flex-col items-start ">
                  <div className="text-sm text-gray-500 dark:text-gray-300 text-start">{item.name}</div>
                  <div className="text-lg font-bold ">{formatNumberWithCommas(item.value)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
  );
}
