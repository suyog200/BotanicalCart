export interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  units?: number;
  category?: string[];
  careInstructions?: string[];
  imageUrl?: string | null;
  imagePublicId?: string | null;
  isFeatured?: boolean;
  inStock?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product?: Product; // Make it optional since it might not always be populated
  createdAt: string;
  isActive: boolean;
}

// Add response type for API
export interface WishlistResponse {
  data: WishlistItem[];
  total: number;
  page?: number;
  totalPages?: number;
  success?: boolean;
  message?: string;
}
