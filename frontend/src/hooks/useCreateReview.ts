import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/api";

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      productId: string;
      rating: number;
      comment?: string;
    }) => {
      const res = await api.post("/api/v1/reviews", data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["product-reviews", variables.productId],
      });
    },
  });
};