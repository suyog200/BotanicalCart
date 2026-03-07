import { Doughnut } from "react-chartjs-2";
import { usePaymentRevenue } from "@/hooks/usePaymentRevenue";

const PaymentRevenueChart = () => {
  const { data, isLoading, error } = usePaymentRevenue();

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">
          Revenue by Payment Method
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
          Revenue by Payment Method
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
          Revenue by Payment Method
        </h2>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.map((item: any) => item.paymentMethod),
    datasets: [
      {
        data: data.map((item: any) => Number(item._sum.totalAmount)),
        backgroundColor: ["#16a34a", "#3b82f6"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Revenue by Payment Method</h2>
      <div className="h-64 w-full flex items-center justify-center">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PaymentRevenueChart;
