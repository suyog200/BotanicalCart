import { api } from "@/api/api";
import type { WishlistResponse } from "@/types/wishListTypes";

export const addToWishlist = async (productId: string) => {
  const res = await api.post("/api/v1/wishlist", { productId });
  return res.data;
};

export const removeFromWishlist = async (productId: string) => {
  const res = await api.delete(`/api/v1/wishlist/${productId}`);
  return res.data;
};

export const getWishlist = async (
  page = 1,
  limit = 20
): Promise<WishlistResponse> => {
  const res = await api.get(`/api/v1/wishlist?page=${page}&limit=${limit}`);
  return res.data;
};

export const checkWishlist = async (productId: string): Promise<boolean> => {
  const res = await api.get(
    `/api/v1/wishlist/check?productId=${encodeURIComponent(productId)}`
  );
  return res.data.data.wishlisted;
};
