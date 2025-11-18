// hooks/usePlants.ts
import { useState, useEffect } from 'react';
import { api } from '@/api/api';
import toast from 'react-hot-toast';

export interface Plant {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imagePublicId: string;
  category: string[]; // Array of categories
  inStock: boolean;
  isFeatured: boolean;
  units: number;
  careInstructions: string[];
  createdAt: string;
  updatedAt: string;
}

export const usePlants = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlants = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.get('/api/v1/products');
      
      if (response.status === 200) {
        const plantsData = response.data.data || response.data;
        setPlants(plantsData);
      }
    } catch (error: any) {
      console.error('Error fetching plants:', error);
      const errorMessage = error.response?.data?.message || 'Failed to load plants';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch plants on mount
  useEffect(() => {
    fetchPlants();
  }, []);

  return {
    plants,
    isLoading,
    error,
    refetch: fetchPlants,
  };
};