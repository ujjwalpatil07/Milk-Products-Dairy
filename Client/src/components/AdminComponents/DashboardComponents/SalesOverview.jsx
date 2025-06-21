import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PercentIcon from "@mui/icons-material/Percent";
import BarChartIcon from "@mui/icons-material/BarChart";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import ListAltIcon from '@mui/icons-material/ListAlt';

import { formatNumberWithCommas } from "../../../utils/format"

const salesData = [
    {
        name: "Revenue",
        value: 8000,
        icon: <TrendingUpIcon className="text-green-600" />,
        bg: "bg-green-100 dark:bg-green-800/30",
    },
    {
        name: "Sales",
        value: 1240,
        icon: <PercentIcon className="text-blue-600" />,
        bg: "bg-blue-100 dark:bg-blue-800/30",
    },
    {
        name: "Profit",
        value: 26500,
        icon: <BarChartIcon className="text-purple-600" />,
        bg: "bg-purple-100 dark:bg-purple-800/30",
    },
    {
        name: "Cost",
        value: 45700,
        icon: <MoneyOffIcon className="text-yellow-600" />,
        bg: "bg-yellow-100 dark:bg-yellow-800/30",
    },
    {
        name: "Expenses",
        value: 13200,
        icon: <ListAltIcon className="text-red-600" />,
        bg: "bg-red-100 dark:bg-red-800/30",
    },
]; 

export default function SalesOverview() {
    return (
        <div className="bg-white dark:bg-gray-500/20 rounded-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>

            {/* For small screens: horizontal scroll */}
            <div className="md:hidden flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                {salesData.map((item, index) => (
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
            <div className="hidden md:grid grid-cols-1 max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {salesData.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-4 p-4 rounded-lg ${item.bg}`}
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
  
  