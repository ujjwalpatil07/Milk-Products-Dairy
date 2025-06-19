import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ProductsStock = ({ fetchedProducts }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!Array.isArray(fetchedProducts)) return;

    // Sort products by stock (descending) and take top 4
    const topProducts = [...fetchedProducts]
      .sort((a, b) => b.stock - a.stock)
      .slice(0, 4);

    const labels = topProducts.map((product) => product.name);
    const data = topProducts.map((product) => Number(product.stock || 0));

    setChartData({
      labels,
      datasets: [
        {
          label: 'Inventory (in kg/liters)',
          data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          borderWidth: 0,
          spacing : 5,
          weight : 20,
          hoverOffset: 8
        },
      ],
    });
  }, [fetchedProducts]);

  const options = {
    responsive: true,
    hoverOffset: 4,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#374151', // Tailwind's gray-700 (optional for dark mode)
        },
      },
    },
  };

  return (
    <div className="w-full h-[400px] bg-white dark:bg-gray-500/20 rounded-sm p-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Products Stock</h2>
      <hr className="my-2 border-gray-200 dark:border-gray-600" />
      {chartData ? (
        <Doughnut data={chartData} options={options} />
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-300">Loading...</p>
      )}
    </div>
  );
};
