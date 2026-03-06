// src/hooks/useWishlist.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { WishlistItem } from "@/types/wishListTypes";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "@/api/wishListAPI";

const WISHLIST_QUERY_KEY = ["wishlist"];

// Define response type
interface WishlistResponse {
  data: WishlistItem[];
  total: number;
  page?: number;
  totalPages?: number;
}

export function useWishlist(page = 1, limit = 50) {
  const queryClient = useQueryClient();

  // fetch wishlist (paginated) - Updated syntax
  const query = useQuery({
    queryKey: [...WISHLIST_QUERY_KEY, { page, limit }],
    queryFn: () => getWishlist(page, limit),
    staleTime: 1000 * 60,
    placeholderData: (previousData) => previousData, // replaces keepPreviousData
  });

  // add mutation (optimistic) - Updated syntax
  const addMutation = useMutation({
    mutationFn: (productId: string) => addToWishlist(productId),
    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({
        queryKey: [...WISHLIST_QUERY_KEY, { page, limit }],
      });
      const previous = queryClient.getQueryData<WishlistResponse>([
        ...WISHLIST_QUERY_KEY,
        { page, limit },
      ]);

      queryClient.setQueryData<WishlistResponse>(
        [...WISHLIST_QUERY_KEY, { page, limit }],
        (old) => {
          const existingIds = new Set(
            (old?.data ?? []).map((i: WishlistItem) => i.productId)
          );
          if (existingIds.has(productId)) return old;

          const optimisticItem: WishlistItem = {
            id: `optimistic-${productId}-${Date.now()}`,
            userId: "", // will be populated by server
            productId,
            product: { id: productId, name: "", price: 0 }, // minimal product
            createdAt: new Date().toISOString(),
            isActive: true,
          };

          return {
            ...(old ?? { data: [], total: 0 }),
            data: [optimisticItem, ...(old?.data ?? [])],
            total: (old?.total ?? 0) + 1,
          };
        }
      );

      return { previous };
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          [...WISHLIST_QUERY_KEY, { page, limit }],
          context.previous
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [...WISHLIST_QUERY_KEY, { page, limit }],
      });
    },
  });

  // remove mutation (optimistic) - Updated syntax
  const removeMutation = useMutation({
    mutationFn: (productId: string) => removeFromWishlist(productId),
    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({
        queryKey: [...WISHLIST_QUERY_KEY, { page, limit }],
      });
      const previous = queryClient.getQueryData<WishlistResponse>([
        ...WISHLIST_QUERY_KEY,
        { page, limit },
      ]);

      queryClient.setQueryData<WishlistResponse>(
        [...WISHLIST_QUERY_KEY, { page, limit }],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.filter(
              (i: WishlistItem) => i.productId !== productId
            ),
            total: Math.max(
              0,
              (old.total ?? 0) -
                (old.data.some((i: WishlistItem) => i.productId === productId)
                  ? 1
                  : 0)
            ),
          };
        }
      );

      return { previous };
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          [...WISHLIST_QUERY_KEY, { page, limit }],
          context.previous
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [...WISHLIST_QUERY_KEY, { page, limit }],
      });
    },
  });

  // toggle helper
  const toggle = async (product: { id: string }) => {
    const cache = queryClient.getQueryData<WishlistResponse>([
      ...WISHLIST_QUERY_KEY,
      { page, limit },
    ]);
    const exists = (cache?.data ?? []).some(
      (i: WishlistItem) => i.productId === product.id
    );

    if (exists) {
      await removeMutation.mutateAsync(product.id);
      return { action: "removed" as const };
    } else {
      await addMutation.mutateAsync(product.id);
      return { action: "added" as const };
    }
  };

  const isWishlisted = (productId: string) => {
    const cache = queryClient.getQueryData<WishlistResponse>([
      ...WISHLIST_QUERY_KEY,
      { page, limit },
    ]);
    return (cache?.data ?? []).some(
      (i: WishlistItem) => i.productId === productId
    );
  };

  return {
    ...query,
    add: (productId: string) => addMutation.mutate(productId),
    remove: (productId: string) => removeMutation.mutate(productId),
    toggle,
    isWishlisted,
    addMutation,
    removeMutation,
  };
}
