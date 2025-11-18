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
  product?: Product; // populated by server in list endpoint
  createdAt: string;
  isActive: boolean;
}
