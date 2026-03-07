import { useLowStock } from "@/hooks/useLowStock";

const LowStockWidget = () => {
  const { data } = useLowStock();

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">
          Low Stock Alerts
        </h2>
        <p className="text-green-600">
          All products have sufficient stock.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-red-600">
        Low Stock Alerts
      </h2>

      <div className="space-y-3">
        {data.map((item: any) => (
          <div
            key={item.id}
            className="flex justify-between text-sm"
          >
            <span>{item.name}</span>
            <span className="text-red-500 font-semibold">
              {item.units} left
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockWidget;