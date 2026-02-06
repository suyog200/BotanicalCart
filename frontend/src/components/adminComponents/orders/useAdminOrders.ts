import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllAdminOrders } from "@/api/adminOrders";

export const useAdminOrders = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["adminOrders"],
      queryFn: async ({ pageParam }) => {
        const res = await getAllAdminOrders(pageParam);
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
