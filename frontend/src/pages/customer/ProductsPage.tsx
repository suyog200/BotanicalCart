import { useState, useMemo } from "react";
import { ProductsSidebar } from "@/components/products/ProductsSidebar";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { MobileFiltersDrawer } from "@/components/products/MobileFiltersDrawer";
import { FilterToggleButton } from "@/components/products/FilterToggleButton";
import { useProducts } from "@/hooks/useProducts";
import { useActiveFiltersCount } from "@/hooks/useActiveFiltersCount";
import { type SortOption } from "@/components/products/PriceFilter";

const ProductsPage = () => {
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const activeFiltersCount = useActiveFiltersCount({
    categoryIds,
    priceRange,
    sortBy,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useProducts({
      categoryIds,
      priceRange: priceRange || undefined,
    });

  const allProducts = data?.pages.flatMap((page) => page.items) ?? [];

  // Sort products based on selected option (client-side sorting)
  const products = useMemo(() => {
    if (sortBy === "default") return allProducts;
    const sorted = [...allProducts];
    if (sortBy === "price-low") {
      return sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      return sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [allProducts, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Page Header - Mobile */}
        <div className="lg:hidden mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
          <p className="text-sm text-gray-600 mt-1">
            {products.length} {products.length === 1 ? "product" : "products"}{" "}
            found
          </p>
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <ProductsSidebar
              categoryIds={categoryIds}
              onCategoryChange={setCategoryIds}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading products...</p>
                </div>
              </div>
            ) : (
              <>
                <ProductsGrid products={products} />

                {hasNextPage && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                      className="px-6 py-3 bg-white border-2 border-gray-200 rounded-lg font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isFetchingNextPage ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Loading...
                        </span>
                      ) : (
                        "Load more"
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <MobileFiltersDrawer
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        categoryIds={categoryIds}
        onCategoryChange={setCategoryIds}
        priceRange={priceRange}
        onPriceChange={setPriceRange}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Mobile Filters Toggle Button */}
      <FilterToggleButton
        onClick={() => setIsMobileFiltersOpen(true)}
        activeFiltersCount={activeFiltersCount}
      />
    </div>
  );
};

export default ProductsPage;
