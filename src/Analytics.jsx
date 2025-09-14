import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Crop Health %",
        data: [80, 85, 75, 90, 95, 88],
        borderColor: "green",
        backgroundColor: "rgba(0,255,0,0.2)",
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: ["Wheat", "Rice", "Maize", "Corn", "Barley"],
    datasets: [
      {
        label: "Yield (tons)",
        data: [20, 35, 25, 40, 30],
        backgroundColor: [
          "red",
          "orange",
          "yellow",
          "green",
          "blue"
        ],
      },
    ],
  };

  const pieData = {
    labels: ["Healthy", "Diseased", "Moderate"],
    datasets: [
      {
        label: "Crop Status",
        data: [60, 25, 15],
        backgroundColor: ["green", "red", "orange"],
      },
    ],
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Crop Health Over Time</h2>
          <Line data={lineData} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Crop Yield</h2>
          <Bar data={barData} />
        </div>
        <div className="bg-white p-4 rounded shadow md:col-span-2 flex justify-center items-center">
  <div style={{ width: "300px", height: "300px" }}> {/* Set fixed size */}
    <h2 className="text-xl font-semibold mb-2 text-center">Crop Status Distribution</h2>
    <Pie 
      data={pieData} 
      options={{ maintainAspectRatio: false }} // Makes chart respect container size
    />
  </div>
</div>

      </div>
    </div>
  );
}
