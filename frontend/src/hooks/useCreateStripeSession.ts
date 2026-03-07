import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/api";

export const useCreateStripeSession = () => {
  return useMutation({
    mutationFn: async (data: {
      items: { productId: string; quantity: number }[];
      addressId: string;
    }) => {
      const res = await api.post(
        "/api/v1/payments/stripe/create-session",
        data
      );
      return res.data;
    },
  });
};
