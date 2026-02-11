import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useEffect } from "react";
import { getOrders } from "@/api/orders";
import { Package } from "lucide-react";
import type { Order } from "@/types/order";
import OrderCard from "@/components/orders/OrderCard";
import LoadingState from "@/components/orders/LoadingState";
import ErrorState from "@/components/orders/ErrorState";
import EmptyOrdersState from "@/components/orders/EmptyOrdersState";

const OrdersPage = () => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["orders"],
    queryFn: async ({ pageParam }) => {
      const res = await getOrders(pageParam);
      return res;
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.pagination?.hasMore
        ? lastPage.pagination.nextCursor
        : undefined;
    },
    initialPageParam: undefined,
  });

  // Flatten all pages into a single array of orders
  const orders: Order[] = data?.pages.flat() || [];
  const totalOrders = orders.length;

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
              <span className="font-medium">{totalOrders}</span>
              <span>{totalOrders === 1 ? "order" : "orders"} in total</span>
              {orders.length < totalOrders && (
                <span className="text-gray-500">(showing {orders.length})</span>
              )}
            </div>
          )}
        </div>

        {/* Content States */}
        {isLoading && <LoadingState />}
        {isError && <ErrorState />}
        {!isLoading && !isError && orders.length === 0 && <EmptyOrdersState />}
        {!isLoading && !isError && orders.length > 0 && (
          <>
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>

            {/* Infinite Scroll Trigger */}
            <div
              ref={loadMoreRef}
              className="flex items-center justify-center py-8"
            >
              {isFetchingNextPage && (
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                  <span className="text-sm">Loading more orders...</span>
                </div>
              )}
              {!hasNextPage && orders.length > 0 && (
                <p className="text-sm text-gray-500">
                  You've reached the end of your orders
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
