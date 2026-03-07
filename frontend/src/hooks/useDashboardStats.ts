import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/analytics/dashboard");
      return res.data.data;
    },
  });
};