import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";

export const useProductReviews = (productId: string) => {
  return useQuery({
    queryKey: ["product-reviews", productId],
    queryFn: async () => {
      const res = await api.get(`/api/v1/reviews/${productId}`);
      return res.data;
    },
    enabled: !!productId,
  });
};