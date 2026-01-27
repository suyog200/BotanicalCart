import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/orders";
import {
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  ShoppingBag,
  Calendar,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { useState } from "react";

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  subtotal: number;
}

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

const OrdersPage = () => {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const orders: Order[] = data?.data || [];

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const getStatusConfig = (status: string) => {
    const configs: Record<
      string,
      { icon: React.ReactElement; color: string; bg: string }
    > = {
      pending: {
        icon: <Clock className="w-4 h-4" />,
        color: "text-yellow-700",
        bg: "bg-yellow-100",
      },
      processing: {
        icon: <Package className="w-4 h-4" />,
        color: "text-blue-700",
        bg: "bg-blue-100",
      },
      shipped: {
        icon: <Truck className="w-4 h-4" />,
        color: "text-purple-700",
        bg: "bg-purple-100",
      },
      delivered: {
        icon: <CheckCircle2 className="w-4 h-4" />,
        color: "text-green-700",
        bg: "bg-green-100",
      },
      cancelled: {
        icon: <XCircle className="w-4 h-4" />,
        color: "text-red-700",
        bg: "bg-red-100",
      },
    };

    return configs[status.toLowerCase()] || configs.pending;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
            <p className="text-lg text-gray-600 font-medium">
              Loading your orders...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md border border-red-200 p-8 text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Failed to Load Orders
            </h2>
            <p className="text-gray-600 mb-6">
              An error occurred while fetching your orders
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                No Orders Yet
              </h2>
              <p className="text-gray-600 mb-8">
                You haven't placed any orders yet. Start shopping to see your
                orders here!
              </p>
              <a
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                <ShoppingBag className="w-5 h-5" />
                Start Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-green-100 rounded-lg">
              <Package className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600">Track and manage your orders</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
            <span className="font-medium">{orders.length}</span>
            <span>{orders.length === 1 ? "order" : "orders"} in total</span>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => {
            const isExpanded = expandedOrders.has(order.id);
            const statusConfig = getStatusConfig(order.status);

            return (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Order Header */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 ${statusConfig.bg} rounded-lg`}>
                        {statusConfig.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Order ID</p>
                        <p className="font-semibold text-gray-900">
                          #{order.id}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
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
                        <p className="text-sm text-gray-500 mb-1">
                          Total Amount
                        </p>
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
                        onClick={() => toggleOrderExpansion(order.id)}
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

                  {/* Order Items (Expanded) */}
                  {isExpanded && order.items && order.items.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                        Order Items
                      </h3>
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">
                              {item.productName}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Quantity:{" "}
                              <span className="font-medium">
                                {item.quantity}
                              </span>
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

                      {/* Cancel Order Button */}
                      {order.status.toLowerCase() !== "cancelled" &&
                        order.status.toLowerCase() !== "delivered" && (
                          <div className="mt-6 pt-4 border-t border-gray-200">
                            <button
                              onClick={() => {
                                // Functionality to be added later
                                console.log("Cancel order:", order.id);
                              }}
                              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 font-semibold rounded-lg transition-colors border-2 border-red-200 hover:border-red-300"
                            >
                              <XCircle className="w-5 h-5" />
                              Cancel Order
                            </button>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
