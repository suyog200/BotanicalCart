// hooks/useProduct.ts
import { useState, useEffect } from 'react';
import { api } from '@/api/api';
import toast from 'react-hot-toast';
import type { Plant } from './usePlants';

export const useFetchSingleProduct = (productId: string | undefined) => {
  const [product, setProduct] = useState<Plant | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.get(`/api/v1/products/${id}`);
      
      if (response.status === 200) {
        const productData = response.data.data || response.data;
        setProduct(productData);
      }
    } catch (error: any) {
      console.error('Error fetching product:', error);
      
      if (error.response?.status === 404) {
        setError('Product not found');
      } else {
        const errorMessage = error.response?.data?.message || 'Failed to load product';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  return {
    product,
    isLoading,
    error,
    refetch: () => productId && fetchProduct(productId),
  };
};