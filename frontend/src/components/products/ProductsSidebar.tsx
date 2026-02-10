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
    <aside className="w-64 shrink-0 bg-white border border-gray-200 rounded-xl shadow-sm p-6 sticky top-4 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        <button
          onClick={() => {
            onCategoryChange([]);
            onPriceChange(null);
            onSortChange("default");
          }}
          className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        <div className="pb-6 border-b border-gray-100">
          <CategoryFilter selected={categoryIds} onChange={onCategoryChange} />
        </div>

        <div className="pb-6 border-b border-gray-100">
          <PriceRangeFilter value={priceRange} onChange={onPriceChange} />
        </div>

        <div>
          <PriceFilter value={sortBy} onChange={onSortChange} />
        </div>
      </div>
    </aside>
  );
};
