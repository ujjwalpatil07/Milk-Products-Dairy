

import { Doughnut, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Milk', 'Paneer', 'Ghee', 'Curd'],
  datasets: [
    {
      label: 'Inventory (in kg/liters)',
      data: [120, 80, 50, 60],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

export const ProductsStock = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-gray-500/20 rounded-sm p-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Products Stock</h2>
      <hr className="my-2 border-gray-200 dark:border-gray-600" />
      <Doughnut data={data} options={options} />
    </div>
  );

}


