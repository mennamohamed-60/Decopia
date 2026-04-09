import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
  const data = {
    labels: ["Decoy A", "Decoy B", "Decoy C", "Decoy D"], 
    datasets: [
      {
        label: "Number of Customers",
        data: [200, 50, 100, 125], 
        backgroundColor: ["#3b82f6", "#f59e0b", "#10b981", "#ef4444"], 
      },
    ],
  };

  const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 10,
      },
    },
    x: {
      
      maxBarThickness: 10, 
    },
  },
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Decoy Popularity Among Customers" },
  },
  elements: {
    bar: {
       borderRadius: { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
      borderSkipped: false, 
      barThickness: 5,
    },
  },
};


  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg h-100 ">
      <Bar data={data} options={options} />
    </div>
  );
}
