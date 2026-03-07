// hooks/useSimilarProducts.ts
import { useState, useEffect } from "react";
import { api } from "@/api/api";
import type { Plant } from "./usePlants";

export const useSimilarProducts = (currentProduct: Plant | null) => {
  const [similarProducts, setSimilarProducts] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentProduct) return;

    const fetchSimilarProducts = async () => {
      setIsLoading(true);

      try {
        const response = await api.get("/api/v1/products");

        if (response.status === 200) {
          const allProducts = response.data.data || response.data;

          // Filter products that share at least one category with current product
          const similar = allProducts
            .filter(
              (product: Plant) =>
                product.id !== currentProduct.id &&
                product.inStock &&
                product.categories?.some((cat) =>
                  currentProduct.categories?.some(
                    (currentCat) => currentCat.id === cat.id,
                  ),
                ),
            )
            .slice(0, 4); // Limit to 4 similar products

          setSimilarProducts(similar);
        }
      } catch (error) {
        console.error("Error fetching similar products:", error);
        setSimilarProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [currentProduct]);

  return { similarProducts, isLoading };
};
