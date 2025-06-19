// components/Statistics.jsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Sample data and config
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Monthly Sales Overview',
    },
  },
};

const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const data = {
  labels,
  datasets: [
    {
      label: 'Purchase',
      data: [1200, 1900, 2700, 2500, 2800, 1200, 900],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
    },
    {
      label: 'Return',
      data: [800, 1000, 1200, 900, 1100, 550, 880],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    },
    {
      label: 'Cancel',
      data: [600, 100, 20, 60, 45, 105, 78],
      backgroundColor: 'rgba(70, 80, 188, 0.6)',
    }
  ],
};

const Statistics = () => {
  return (
    <div className="bg-white dark:bg-gray-500/20 rounded-sm p-4 ">
      <Bar options={options} data={data} />
    </div>
  );
};

export default Statistics;

