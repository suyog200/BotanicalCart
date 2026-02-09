import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";
import type { Category } from "@/types/categoryTypes";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/api/v1/categories?activeOnly=true&limit=200");
      return res.data.data as Category[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
