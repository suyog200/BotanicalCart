import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllAdminOrders } from "@/api/adminOrders";

export const useAdminOrders = ({
    search,
    status,
    paymentStatus,
} : { search?: string; status?: string; paymentStatus?: string }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["adminOrders", search, status, paymentStatus],
      queryFn: async ({ pageParam }) => {
        const res = await getAllAdminOrders(pageParam, search, status, paymentStatus);
        return res;
      },
      getNextPageParam: (lastPage) => {
        return lastPage.pagination?.hasMore
          ? lastPage.pagination.nextCursor
          : undefined;
      },
      initialPageParam: undefined,
    });

  // Flatten all pages into a single array of orders
  const orders =
    data?.pages.flatMap((page) => page.data || []).filter(Boolean) || [];
  const totalOrders = data?.pages[0]?.pagination?.totalCount || 0;

  return {
    orders,
    totalOrders,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
