import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export const useLowStock = () => {
  return useQuery({
    queryKey: ["low-stock"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/analytics/low-stock");
      return res.data.data;
    },
  });
};