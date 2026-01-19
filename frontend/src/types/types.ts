export interface Plant {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categories: Category[]; // Change from category: string[] to categories: Category[]
  inStock: boolean;
  isFeatured: boolean;
  units: number;
  careInstructions: string[];
  imagePublicId: string;
  createdAt: string;
  updatedAt: string;
}

// Product interface representing the structure of a product object getting from the backend
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categories: Category[];
  categoryIds: string[]; // Added to hold category IDs
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
