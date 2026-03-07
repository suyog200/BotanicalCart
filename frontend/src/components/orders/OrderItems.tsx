import type { OrderItem } from "@/types/order";

interface OrderItemsProps {
  items: OrderItem[];
}

const OrderItems = ({ items }: OrderItemsProps) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
        Order Items
      </h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">
                {item.productName}
              </h4>
              <p className="text-sm text-gray-600">
                Quantity: <span className="font-medium">{item.quantity}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                ₹{item.subtotal.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">
                ₹{(item.subtotal / item.quantity).toFixed(2)} each
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;