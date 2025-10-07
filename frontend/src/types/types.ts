export interface Plant {
  id: string;
  name: string;
  price: number;
  category: 'medicinal' | 'home-decor' | 'outdoor' | 'indoor';
  image: string;
  description: string;
  care: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string[];
  careInstructions: string[];
  imageUrl: string;
  imagePublicId: string;
  isFeatured: boolean;
  units: string;
  inStock: boolean;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}
