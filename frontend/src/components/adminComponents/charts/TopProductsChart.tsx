import { Bar } from "react-chartjs-2";
import { useTopProducts } from "@/hooks/useTopSellingProducts";

const TopProductsChart = () => {
  const { data } = useTopProducts();

  if (!data) return null;

  const chartData = {
    labels: data.map((item: any) => item.name),
    datasets: [
      {
        label: "Units Sold",
        data: data.map((item: any) => item.quantity),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">
        Top Selling Products
      </h2>
      <Bar data={chartData} />
    </div>
  );
};

export default TopProductsChart;