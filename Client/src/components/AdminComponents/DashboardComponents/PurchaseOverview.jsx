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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {purchaseOverviewData.map((item, index) => (
          <div key={index * 0.5} className={`flex items-center gap-3 p-3 rounded-lg ${item.bg}`}>
            <div className="text-2xl">
              {item.icon}
            </div>
            <div className="flex flex-col items-start ">
              <div className="text-sm text-gray-500 dark:text-gray-300 text-center">{item.name}</div>
              <div className="text-lg font-bold ">{formatNumberWithCommas(item.value)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
