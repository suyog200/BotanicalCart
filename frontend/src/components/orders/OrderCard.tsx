import { useState } from "react";
import { Calendar, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import type { Order } from "@/types/order";
import { getStatusConfig } from "@/utils/orderUtils";
import OrderItems from "./OrderItems";
import ShippingAddress from "./ShippingAddress";
import PaymentInfo from "./PaymentInfo";
import CancelOrderButton from "./CancelOrderButton";
import OrderEnquiries from "./OrderEnquiries";
import ReviewModal from "../modals/ReviewModal";
import { useReviewEligibility } from "@/hooks/useReviewElgibility";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const statusConfig = getStatusConfig(order.status);
  const firstProductId = order.items?.[0]?.productId ?? "";
  const isDelivered = order.status === "DELIVERED";

  // Only fetch eligibility when expanded and order is delivered
  const { data: eligibility } = useReviewEligibility(
    isExpanded && isDelivered ? firstProductId : ""
  );

  const hasItems = (order.items?.length ?? 0) > 0;

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

            {/* Status badge — icon removed here since it's already in the header */}
            <div className={`px-4 py-2 rounded-full ${statusConfig.bg} ${statusConfig.color} font-medium text-sm capitalize`}>
              {order.status}
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
            {hasItems && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Items</p>
                <p className="text-lg font-semibold text-gray-900">
                  {order.items.length}
                </p>
              </div>
            )}
          </div>

          {hasItems && (
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="flex items-center gap-2 px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
              aria-expanded={isExpanded}
            >
              {isExpanded ? (
                <>Hide Details <ChevronUp className="w-5 h-5" /></>
              ) : (
                <>View Details <ChevronDown className="w-5 h-5" /></>
              )}
            </button>
          )}
        </div>

        {/* Expanded Details */}
        {isExpanded && hasItems && (
          <div className="mt-4 space-y-4">
            <OrderItems items={order.items} />
            <ShippingAddress order={order} />
            <PaymentInfo order={order} />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <CancelOrderButton order={order} />
              <Link
                to={`/orders/${order.id}/enquire`}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Submit Enquiry</span>
              </Link>
            </div>

            {/* Enquiries & Reviews */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="mb-4">
                <OrderEnquiries orderId={order.id} />
              </div>

              {isDelivered && eligibility?.eligible && (
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="mt-3 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Write Review
                </button>
              )}

              {isDelivered && eligibility?.alreadyReviewed && (
                <p className="mt-3 text-sm text-gray-500">
                  You already reviewed this product.
                </p>
              )}

              {showReviewModal && (
                <ReviewModal
                  productId={firstProductId}
                  onClose={() => setShowReviewModal(false)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;