import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter, type SortOption } from "./PriceFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";

interface ProductsSidebarProps {
  categoryIds: string[];
  onCategoryChange: (ids: string[]) => void;
  priceRange: [number, number] | null;
  onPriceChange: (range: [number, number] | null) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const ProductsSidebar: React.FC<ProductsSidebarProps> = ({
  categoryIds,
  onCategoryChange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <aside className="w-64 shrink-0 border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <CategoryFilter selected={categoryIds} onChange={onCategoryChange} />

      <div className="mt-6">
        <PriceRangeFilter value={priceRange} onChange={onPriceChange} />
      </div>

      <div className="mt-6">
        <PriceFilter value={sortBy} onChange={onSortChange} />
      </div>
    </aside>
  );
};
