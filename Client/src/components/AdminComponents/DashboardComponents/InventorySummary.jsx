import InventoryIcon from "@mui/icons-material/Inventory";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

import { formatNumberWithCommas } from "../../../utils/format"

export default function InventorySummary() {
  const inventorySummaryData = [
    {
      name: "Quantity in Hand",
      value: 1200,
      icon: <InventoryIcon className="text-green-600" />,
      bg: "bg-green-100 dark:bg-green-800/30",
    },
    {
      name: "Low Stock",
      value: 85,
      icon: <ReportProblemIcon className="text-yellow-600" />,
      bg: "bg-yellow-100 dark:bg-yellow-800/30",
    },
    {
      name: "Out of Stock",
      value: 32,
      icon: <ErrorOutlineIcon className="text-red-600" />,
      bg: "bg-red-100 dark:bg-red-800/30",
    },
    {
      name: "Near Expiry",
      value: 18,
      icon: <AccessTimeIcon className="text-orange-600" />,
      bg: "bg-orange-100 dark:bg-orange-800/30",
    },
    {
      name: "Total Stock Items",
      value: 156,
      icon: <FormatListNumberedIcon className="text-blue-600" />,
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
                  <div className="text-lg font-bold ">{formatNumberWithCommas(item.value)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
  );
}
