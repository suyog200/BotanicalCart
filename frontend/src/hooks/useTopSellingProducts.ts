import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export const useTopProducts = () => {
  return useQuery({
    queryKey: ["top-products"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/analytics/top-products");
      return res.data.data;
    },
  });
};