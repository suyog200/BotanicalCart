import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/api/api";
import type { Product, Plant } from "@/types/types";

const PLANTS_PER_PAGE = 12;

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

async function fetchPlantsPage({
  pageParam = 1,
  category,
  q,
  signal,
}: {
  pageParam?: number;
  category?: string;
  q?: string;
  signal?: AbortSignal;
}): Promise<ServerResponsePage> {
  const params = new URLSearchParams();
  params.set("page", String(pageParam));
  params.set("limit", String(PLANTS_PER_PAGE));
  if (category && category !== "all") params.set("category", category);
  if (q) params.set("q", q);

  const url = `/api/v1/products?${params.toString()}`;

  const res = await api.get(url, { signal });

  // Transform Product[] to Plant[] to ensure compatibility
  const items: Plant[] = (res.data?.data ?? []).map((product: Product) => ({
    ...product,
    units: Number(product.units) || 0, // Convert string to number for Plant type
  }));

  const pagination: ServerPagination = res.data?.pagination ?? {
    page: pageParam,
    limit: PLANTS_PER_PAGE,
    total: null,
    totalPages: null,
    hasNextPage: items.length === PLANTS_PER_PAGE,
    hasPreviousPage: pageParam > 1,
  };

  return {
    items,
    pagination,
  };
}

export function usePlants({
  category = "all",
  q = "",
}: {
  category?: string;
  q?: string;
}) {
  const queryKey = ["plants", category ?? "all", q ?? ""];

  const infiniteQuery = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1, signal }) =>
      fetchPlantsPage({ pageParam, category, q, signal }),
    enabled: true,
    getNextPageParam: (lastPage) => {
      const hasNext = lastPage.pagination?.hasNextPage;
      return hasNext ? (lastPage.pagination.page ?? 1) + 1 : undefined;
    },
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 5,
    initialPageParam: 1,
  });

  const pages = infiniteQuery.data?.pages ?? [];
  const products = pages.flatMap((p) => p.items) as Plant[];
  const total = pages[0]?.pagination?.total ?? null;

  return {
    ...infiniteQuery,
    products,
    total,
    perPage: PLANTS_PER_PAGE,
  };
}

export type { Plant };
