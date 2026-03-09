import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export const useMonthlyRevenue = () => {
  return useQuery({
    queryKey: ["monthly-revenue"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/analytics/monthly-revenue");
      return res.data.data ?? [];
    },
  });
};