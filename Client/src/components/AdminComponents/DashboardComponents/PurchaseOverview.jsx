import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import UndoIcon from "@mui/icons-material/Undo";
import CancelIcon from "@mui/icons-material/Cancel";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { formatNumberWithCommas } from "../../../utils/format"

export default function PurchaseOverview() {


  const purchaseOverviewData = [
    {
      name: "Total Purchased",
      value: 540, // e.g. number of orders placed
      icon: <ShoppingCartIcon className="text-green-600" />,
      bg: "bg-green-100 dark:bg-green-800/30",
    },
    {
      name: "Total Returns",
      value: 23, // e.g. number of returned orders
      icon: <UndoIcon className="text-yellow-600" />,
      bg: "bg-yellow-100 dark:bg-yellow-800/30",
    },
    {
      name: "Total Canceled",
      value: 12, // e.g. number of canceled orders
      icon: <CancelIcon className="text-red-600" />,
      bg: "bg-red-100 dark:bg-red-800/30",
    },
    {
      name: "Total Wishlisted",
      value: 98, // e.g. items users have added to wishlist
      icon: <FavoriteIcon className="text-blue-600" />,
      bg: "bg-blue-100 dark:bg-blue-800/30",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-500/20 rounded-sm p-4">
      <h2 className="text-lg font-semibold mb-4"> Purchase Overview </h2>

      {/* For small screens: horizontal scroll */}
      <div className="md:hidden flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {purchaseOverviewData.map((item, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-64 min-w-full sm:min-w-[300px] flex items-center gap-4 p-4 rounded-lg ${item.bg}`}
          >
            <div className="text-2xl">{item.icon}</div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-300">{item.name}</div>
              <div className="text-lg font-bold">&#8377; {formatNumberWithCommas(item.value)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* For medium+ screens: grid layout */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 max-lg:grid-cols-3 lg:grid-cols-4 gap-3">
        {purchaseOverviewData.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 p-3 rounded-lg ${item.bg}`}
          >
            <div className="text-2xl">{item.icon}</div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-300">{item.name}</div>
              <div className="text-lg font-bold">&#8377; {formatNumberWithCommas(item.value)}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
