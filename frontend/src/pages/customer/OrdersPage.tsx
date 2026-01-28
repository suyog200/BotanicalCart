import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/orders";
import { Package } from "lucide-react";
import type { Order } from "@/types/order";
import OrderCard from "@/components/orders/OrderCard";
import LoadingState from "@/components/orders/LoadingState";
import ErrorState from "@/components/orders/ErrorState";
import EmptyOrdersState from "@/components/orders/EmptyOrdersState";

const OrdersPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const orders: Order[] = data?.data || [];

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
          {!isLoading && !isError && orders.length > 0 && (
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
              <span className="font-medium">{orders.length}</span>
              <span>{orders.length === 1 ? "order" : "orders"} in total</span>
            </div>
          )}
        </div>

        {/* Content States */}
        {isLoading && <LoadingState />}
        {isError && <ErrorState />}
        {!isLoading && !isError && orders.length === 0 && <EmptyOrdersState />}
        {!isLoading && !isError && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
