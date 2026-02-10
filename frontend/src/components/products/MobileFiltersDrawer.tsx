import { useEffect } from "react";
import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter, type SortOption } from "./PriceFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";

interface MobileFiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categoryIds: string[];
  onCategoryChange: (ids: string[]) => void;
  priceRange: [number, number] | null;
  onPriceChange: (range: [number, number] | null) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const MobileFiltersDrawer: React.FC<MobileFiltersDrawerProps> = ({
  isOpen,
  onClose,
  categoryIds,
  onCategoryChange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
}) => {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClearAll = () => {
    onCategoryChange([]);
    onPriceChange(null);
    onSortChange("default");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 overflow-y-auto lg:hidden animate-slide-in-left shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close filters"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="pb-6 border-b border-gray-100">
            <CategoryFilter
              selected={categoryIds}
              onChange={onCategoryChange}
            />
          </div>

          <div className="pb-6 border-b border-gray-100">
            <PriceRangeFilter value={priceRange} onChange={onPriceChange} />
          </div>

          <div className="pb-6 border-b border-gray-100">
            <PriceFilter value={sortBy} onChange={onSortChange} />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleClearAll}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
