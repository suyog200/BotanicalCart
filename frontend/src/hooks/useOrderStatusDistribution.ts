import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export const useOrderStatusDistribution = () => {
  return useQuery({
    queryKey: ["order-status"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/analytics/order-status");
      return res.data.data;
    },
  });
};