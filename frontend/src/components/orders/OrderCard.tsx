import { useState } from "react";
import { Calendar, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Order } from "@/types/order";
import { getStatusConfig } from "@/utils/orderUtils";
import OrderItems from "./OrderItems";
import ShippingAddress from "./ShippingAddress";
import PaymentInfo from "./PaymentInfo";
import CancelOrderButton from "./CancelOrderButton";
import OrderEnquiries from "./OrderEnquiries";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const statusConfig = getStatusConfig(order.status);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        {/* Order Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-start gap-4">
            <div className={`p-3 ${statusConfig.bg} rounded-lg`}>
              {statusConfig.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Order ID</p>
              <p className="font-semibold text-gray-900">#{order.id}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.bg} ${statusConfig.color} font-medium text-sm`}
            >
              {statusConfig.icon}
              <span className="capitalize">{order.status}</span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{order.totalAmount.toFixed(2)}
              </p>
            </div>
            {order.items && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Items</p>
                <p className="text-lg font-semibold text-gray-900">
                  {order.items.length}
                </p>
              </div>
            )}
          </div>

          {order.items && order.items.length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
            >
              {isExpanded ? (
                <>
                  Hide Details
                  <ChevronUp className="w-5 h-5" />
                </>
              ) : (
                <>
                  View Details
                  <ChevronDown className="w-5 h-5" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Expanded Details */}
        {isExpanded && order.items && order.items.length > 0 && (
          <div className="mt-4 space-y-4">
            <OrderItems items={order.items} />
            <ShippingAddress order={order} />
            <PaymentInfo order={order} />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <CancelOrderButton order={order} />
              <button
                onClick={() => navigate(`/orders/${order.id}/enquire`)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Submit Enquiry</span>
              </button>
            </div>

            {/* Order Enquiries */}
            <OrderEnquiries orderId={order.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
