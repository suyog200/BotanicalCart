import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
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
  Tooltip,
  Legend,
);

import { Line } from "react-chartjs-2";
import { useMonthlyRevenue } from "@/hooks/useMontlyRevenue";

const MonthlyRevenueChart = () => {
  const { data, isLoading, error } = useMonthlyRevenue();

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Loading chart...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
        <div className="h-64 flex items-center justify-center text-red-500">
          Error loading chart data
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.map((item: any) => item.month),
    datasets: [
      {
        label: "Revenue",
        data: data.map((item: any) => Number(item.revenue)),
        borderColor: "#16a34a",
        backgroundColor: "#bbf7d0",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: "x" as const,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
      <div className="h-64 w-full">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default MonthlyRevenueChart;
