import { XCircle } from "lucide-react";
import type { Order } from "@/types/order";

interface CancelOrderButtonProps {
  order: Order;
}

const CancelOrderButton = ({ order }: CancelOrderButtonProps) => {
  if (
    order.status.toLowerCase() === "cancelled" ||
    order.status.toLowerCase() === "delivered"
  ) {
    return null;
  }

  const handleCancel = () => {
    console.log("Cancel order:", order.id);
    // TODO: Implement cancel order functionality
  };

  return (
    <div className="pt-4 border-t border-gray-200">
      <button
        onClick={handleCancel}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 font-semibold rounded-lg transition-colors border-2 border-red-200 hover:border-red-300"
      >
        <XCircle className="w-5 h-5" />
        Cancel Order
      </button>
    </div>
  );
};

export default CancelOrderButton;