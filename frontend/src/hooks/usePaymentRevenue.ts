import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export const usePaymentRevenue = () => {
  return useQuery({
    queryKey: ["payment-revenue"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/analytics/payment-revenue");
      return res.data.data;
    },
  });
};