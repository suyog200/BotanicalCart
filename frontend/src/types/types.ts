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