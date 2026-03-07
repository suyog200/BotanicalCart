import { Pie } from "react-chartjs-2";
import { useOrderStatusDistribution } from "@/hooks/useOrderStatusDistribution";

const OrderStatusChart = () => {
  const { data, isLoading, error } = useOrderStatusDistribution();

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">
          Order Status Distribution
        </h2>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Loading chart...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">
          Order Status Distribution
        </h2>
        <div className="h-64 flex items-center justify-center text-red-500">
          Error loading chart data
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">
          Order Status Distribution
        </h2>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.map((item: any) => item.status),
    datasets: [
      {
        data: data.map((item: any) => item._count),
        backgroundColor: ["#3b82f6", "#f59e0b", "#10b981", "#ef4444"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Order Status Distribution</h2>
      <div className="h-64 w-full flex items-center justify-center">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default OrderStatusChart;
