import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/api/api";
import type { Plant, Product } from "@/types/types";

type ServerPagination = {
  page: number;
  limit: number;
  total: number | null;
  totalPages: number | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type ServerResponsePage = {
  items: Plant[];
  pagination: ServerPagination;
};

interface UseProductsParams {
  categoryIds?: string[];
  priceRange?: [number, number];
  sortBy?: string;
}

export const useProducts = ({
  categoryIds = [],
  priceRange,
  sortBy = "default",
}: UseProductsParams = {}) => {
  return useInfiniteQuery({
    queryKey: ["products", categoryIds, priceRange, sortBy],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get("/api/v1/products", {
        params: {
          page: pageParam,
          limit: 12,
          ...(categoryIds.length && {
            categoryIds: categoryIds.join(","),
          }),
          ...(priceRange && {
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
          }),
          ...(sortBy !== "default" && {
            sortBy,
          }),
        },
      });

      // Transform Product[] to Plant[] to ensure compatibility
      const items: Plant[] = (res.data?.data ?? []).map((product: Product) => ({
        ...product,
        units: Number(product.units) || 0,
      }));

      const pagination: ServerPagination = res.data?.pagination ?? {
        page: pageParam,
        limit: 12,
        total: null,
        totalPages: null,
        hasNextPage: false,
        hasPreviousPage: pageParam > 1,
      };

      return {
        items,
        pagination,
      };
    },
    getNextPageParam: (lastPage: ServerResponsePage) => {
      const hasNext = lastPage.pagination?.hasNextPage;
      return hasNext ? (lastPage.pagination.page ?? 1) + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 5,
  });
};
