import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"; import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const theme = localStorage.getItem("theme");

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: `${theme === "light" ? "#1c1b1b" : "#E0E0E0"}`,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#6B7280',
      },
    },
    y: {
      ticks: {
        color: '#6B7280',
      },
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
      borderRadius: 8,
    },
    {
      label: 'Return',
      data: [800, 1000, 1200, 900, 1100, 550, 880],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      borderRadius: 8,
    },
    {
      label: 'Cancel',
      data: [600, 100, 20, 60, 45, 105, 78],
      backgroundColor: 'rgba(70, 80, 188, 0.6)',
      borderRadius: 8,
    }
  ],
};

const Statistics = () => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-500/20 rounded-sm p-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>

      <motion.div
        className="w-full h-[450px] sm:h-[400px] md:h-[450px] lg:h-[600px]"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
      >
        <Bar options={options} data={data} />
      </motion.div>
    </motion.div>
  );
};

export default Statistics;
