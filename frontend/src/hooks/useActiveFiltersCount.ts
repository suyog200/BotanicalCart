import { useMemo } from "react";
import type { SortOption } from "@/components/products/PriceFilter";

interface UseActiveFiltersCountParams {
  categoryIds: string[];
  priceRange: [number, number] | null;
  sortBy: SortOption;
}

export const useActiveFiltersCount = ({
  categoryIds,
  priceRange,
  sortBy,
}: UseActiveFiltersCountParams): number => {
  return useMemo(() => {
    let count = 0;
    if (categoryIds.length > 0) count += categoryIds.length;
    if (priceRange !== null) count += 1;
    if (sortBy !== "default") count += 1;
    return count;
  }, [categoryIds, priceRange, sortBy]);
};
