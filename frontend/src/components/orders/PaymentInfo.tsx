import { CreditCard, IndianRupeeIcon } from "lucide-react";
import type { Order } from "@/types/order";

interface PaymentInfoProps {
  order: Order;
}

const PaymentInfo = ({ order }: PaymentInfoProps) => {
  if (!order.paymentMethod && !order.paymentStatus) return null;

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="pt-4 border-t border-gray-200">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Payment Method */}
        {order.paymentMethod && (
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                Payment Method
              </h3>
              <p className="text-sm font-medium text-gray-900 capitalize">
                {order.paymentMethod}
              </p>
            </div>
          </div>
        )}

        {/* Payment Status */}
        {order.paymentStatus && (
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <IndianRupeeIcon className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                Payment Status
              </h3>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}
              >
                {order.paymentStatus}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentInfo;