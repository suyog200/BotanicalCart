import { useEffect } from "react";
import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter, type SortOption } from "./PriceFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { X } from "lucide-react";

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
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = ""; // "" removes inline style, restores stylesheet
    };
  }, [isOpen]);

  const handleClearAll = () => {
    onCategoryChange([]);
    onPriceChange(null);
    onSortChange("default");
  };

  // Don't unmount — use visibility so slide-out animation plays
  if (!isOpen && typeof window !== "undefined") {
    const drawerVisible = document.querySelector("[data-drawer]");
    if (!drawerVisible) return null; // first render, never opened
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        data-drawer
        className={`fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 overflow-y-auto lg:hidden shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close filters"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="pb-6 border-b border-gray-100">
            <CategoryFilter selected={categoryIds} onChange={onCategoryChange} />
          </div>
          <div className="pb-6 border-b border-gray-100">
            <PriceRangeFilter value={priceRange} onChange={onPriceChange} />
          </div>
          <div className="pb-6 border-b border-gray-100">
            <PriceFilter value={sortBy} onChange={onSortChange} />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleClearAll}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray.50 transition-colors"
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