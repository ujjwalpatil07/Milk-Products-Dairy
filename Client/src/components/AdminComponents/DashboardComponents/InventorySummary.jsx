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
      <h2 className="text-lg font-semibold mb-4">Inventory Summary</h2>

      <div className="flex flex-wrap sm:grid sm:grid-cols-2 gap-3 overflow-x-auto scrollbar-hide pb-2">
        {inventorySummaryData.map((item, index) => (
          <div
            key={index * 0.9}
            className={`w-full sm:min-w-[220px] lg:min-w-0 flex items-center gap-3 p-3 rounded-lg ${item.bg}`}
          >
            <div className="text-2xl">{item.icon}</div>
            <div className="truncate">
              <div className="text-sm text-gray-500 dark:text-gray-300">{item.name}</div>
              <div className="text-lg font-bold whitespace-nowrap">
                &#37; {formatNumberWithCommas(item.value)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
