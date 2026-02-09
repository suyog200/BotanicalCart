import { useState, useMemo } from "react";
import { ProductsSidebar } from "@/components/products/ProductsSidebar";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { useProducts } from "@/hooks/useProducts";
import { type SortOption } from "@/components/products/PriceFilter";

const ProductsPage = () => {
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("default");

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
    <div className="container mx-auto px-4 py-8 flex gap-6">
      {/* Sidebar */}
      <ProductsSidebar
        categoryIds={categoryIds}
        onCategoryChange={setCategoryIds}
        priceRange={priceRange}
        onPriceChange={setPriceRange}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Main content */}
      <div className="flex-1">
        {isLoading ? (
          <div>Loading products...</div>
        ) : (
          <>
            <ProductsGrid products={products} />

            {hasNextPage && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="px-6 py-3 border rounded-lg"
                >
                  {isFetchingNextPage ? "Loading..." : "Load more"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
