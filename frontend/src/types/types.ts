export interface Plant {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string[]; 
  inStock: boolean;
  isFeatured: boolean;
  units: number;
  careInstructions: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categories: Category[];
  careInstructions: string[];
  imageUrl: string;
  imagePublicId: string;
  isFeatured: boolean;
  units: string;
  inStock: boolean;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export type Category = {
  id: string;
  name: string;
  slug?: string;
  imageUrl?: string | null;
};
