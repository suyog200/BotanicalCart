export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order?: number;
  isActive: boolean;
  imageUrl?: string;
  imagePublicId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryFormData {
  name: string;
  description?: string;
  isActive: boolean;
  image: File | null;
}

export interface CategorySubmitData extends CategoryFormData {
  image: File | null;
}
