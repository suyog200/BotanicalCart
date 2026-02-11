import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/api/api";
import type { Enquiry } from "./enquiry.types";

interface ApiResponse {
  data: Enquiry[];
  pagination: {
    page: number;
    totalPages: number;
  };
}

export const useAdminEnquiries = (status?: string) => {
  return useInfiniteQuery<ApiResponse>({
    queryKey: ["admin-enquiries", status],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get(`/api/v1/admin/enquiries`, {
        params: {
          page: pageParam,
          limit: 10,
          ...(status && { status }),
        },
      });
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};
