import { OrderRow } from "./OrderRow";
import type { RefObject } from "react";

interface AdminOrder {
  id: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  user: {
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

interface Props {
  orders: AdminOrder[];
  onViewDetails: (orderId: string) => void;
  isFetchingMore?: boolean;
  hasMore?: boolean;
  loadMoreRef?: RefObject<HTMLDivElement | null>;
}

export const OrdersTable = ({
  orders,
  onViewDetails,
  isFetchingMore,
  hasMore,
  loadMoreRef,
}: Props) => {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <div className="text-gray-400 mb-4">
          <svg
            className="mx-auto h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No orders yet
        </h3>
        <p className="text-gray-600">
          Orders will appear here once customers place them.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                onViewDetails={onViewDetails}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Infinite Scroll Trigger */}
      <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
        {isFetchingMore && (
          <div className="flex items-center gap-2 text-gray-600">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
            <span className="text-sm">Loading more orders...</span>
          </div>
        )}
        {!hasMore && orders.length > 0 && (
          <p className="text-sm text-gray-500">No more orders to load</p>
        )}
      </div>
    </div>
  );
};
