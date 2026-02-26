import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";

export const useReviewEligibility = (productId: string) => {
  return useQuery({
    queryKey: ["review-eligibility", productId],
    queryFn: async () => {
      const res = await api.get(
        `/api/v1/reviews/eligibility/${productId}`
      );
      return res.data;
    },
    enabled: !!productId,
  });
};