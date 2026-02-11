import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getAllAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  type ProductData,
} from "@/api/products";
import toast from "react-hot-toast";

export const useAdminProducts = (limit: number = 5, search?: string) => {
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["adminProducts", limit, search],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getAllAdminProducts(pageParam, limit, true, search);
      return res;
    },
    getNextPageParam: (lastPage) => {
      const pagination = lastPage.pagination;
      if (pagination?.hasNextPage) {
        return pagination.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  // Flatten all pages into a single array of products
  const products =
    data?.pages
      .flatMap((page) => page.data || page || [])
      .filter(Boolean)
      .map((product: any) => ({
        ...product,
        // Map productCategories to categories
        // Handle both direct categories array and join table structure
        categories:
          product.categories ||
          product.productCategories?.map((pc: any) => pc.category || pc) ||
          [],
      })) || [];

  const totalProducts =
    data?.pages[0]?.pagination?.totalCount || products.length;

  // Mutation for creating a product
  const createMutation = useMutation({
    mutationFn: (data: ProductData) => createAdminProduct(data),
    onSuccess: () => {
      toast.success("Product added successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
    },
    onError: (error) => {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    },
  });

  // Mutation for updating a product
  const updateMutation = useMutation({
    mutationFn: ({
      productId,
      data,
    }: {
      productId: string;
      data: ProductData;
    }) => updateAdminProduct(productId, data),
    onSuccess: () => {
      toast.success("Product updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    },
  });

  return {
    products,
    totalProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    createProduct: createMutation.mutate,
    updateProduct: updateMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
};
