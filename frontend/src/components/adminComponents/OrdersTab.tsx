import { useState, useRef, useEffect } from "react";
import {
  useAdminOrders,
  OrdersStats,
  OrdersTable,
  OrderDetailsDrawer,
} from "./orders";

export const OrdersTab = () => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    orders,
    totalOrders,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useAdminOrders();

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <OrdersStats totalOrders={totalOrders} displayedCount={orders.length} />

      <OrdersTable
        orders={orders}
        onViewDetails={setSelectedOrderId}
        isFetchingMore={isFetchingNextPage}
        hasMore={hasNextPage}
        loadMoreRef={loadMoreRef}
      />

      <OrderDetailsDrawer
        orderId={selectedOrderId}
        onClose={() => setSelectedOrderId(null)}
      />
    </>
  );
};
