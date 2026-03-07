import {api} from '../api/api'; // Your base API configuration

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export const wishlistAPI = {
  // Get user's wishlist
  getWishlist: async (): Promise<WishlistItem[]> => {
    const response = await api.get('/wishlist');
    return response.data;
  },

  // Add item to wishlist
  addToWishlist: async (plantId: string): Promise<void> => {
    await api.post('/wishlist', { plantId });
  },

  // Remove item from wishlist
  removeFromWishlist: async (plantId: string): Promise<void> => {
    await api.delete(`/wishlist/${plantId}`);
  },

  // Check if item is in wishlist
  isInWishlist: async (plantId: string): Promise<boolean> => {
    const response = await api.get(`/wishlist/check/${plantId}`);
    return response.data.isInWishlist;
  }
};