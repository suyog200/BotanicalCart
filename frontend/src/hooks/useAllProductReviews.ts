// hooks/useAllProductReviews.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";

export const useAllProductReviews = (productIds: string[]) => {
  return useQuery({
    queryKey: ["reviews-bulk", productIds],
    queryFn: async () => {
      if (!productIds.length) return {};

      // Fire all requests in parallel
      const results = await Promise.all(
        productIds.map((id) =>
          api.get(`/api/v1/reviews/${id}`).then((res) => ({
            productId: id,
            ...res.data,
          }))
        )
      );

      // Return as a map for O(1) lookup in PlantCard
      return Object.fromEntries(results.map((r) => [r.productId, r]));
    },
    enabled: productIds.length > 0,
    staleTime: 1000 * 60 * 5, // cache for 5 mins — reviews don't change often
  });
};