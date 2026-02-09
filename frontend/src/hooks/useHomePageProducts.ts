import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";

export const useHomepageProducts = () => {
  return useQuery({
    queryKey: ["homepage-products"],
    queryFn: async () => {
      const res = await api.get(
        "/api/v1/products/home"
      );
      return res.data.data;
    },
  });
};
