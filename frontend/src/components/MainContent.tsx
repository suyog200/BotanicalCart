import { useMemo, useRef, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Loader } from "lucide-react";
import PlantCard from "./PlantCard";
import { defaultCategories } from "@/data/plantsData";
// import { extractCategoriesFromPlants } from "@/utils/categoryFilters";
import { usePlants } from "@/hooks/usePlants";
import SkeletonCard from "./SkeletonCard";

const MainContent: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const {
    products,
    total,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    perPage,
  } = usePlants({ category: activeCategory });

  // number of skeletons to show while loading next page
  const skeletonCount = perPage ?? 8;

  // Build tab categories using defaults + categories seen in fetched products (partial)
  const categories = useMemo(() => {
    if (!products || products.length === 0) return defaultCategories;

    // Extract category names from the new structure
    const categoryNames = new Set<string>();
    products.forEach((product) => {
      if (product.categories && Array.isArray(product.categories)) {
        product.categories.forEach((cat) => {
          if (cat && cat.name) {
            categoryNames.add(cat.name);
          }
        });
      }
    });

    const dynamicCategories = Array.from(categoryNames).map((catName) => {
      const defaultCat = defaultCategories.find(
        (d) => d.value.toLowerCase() === catName.toLowerCase()
      );
      return {
        value: catName.toLowerCase(),
        label: catName,
        icon: defaultCat?.icon || "/icons/default-plant.svg",
      };
    });

    return [
      defaultCategories[0],
      ...dynamicCategories.filter((c) => c.value !== "all"),
    ];
  }, [products]);

  // IntersectionObserver sentinel ref
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        });
      },
      { root: null, rootMargin: "400px", threshold: 0.1 }
    );

    obs.observe(sentinel);
    return () => obs.disconnect();
  }, [sentinelRef.current, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // scroll to top when category changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  // Loading state
  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <Loader className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Loading Plants...
            </h3>
            <p className="text-muted-foreground">
              Fetching the latest plants for you
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (isError) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Leaf className="h-16 w-16 text-red-400 mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Failed to Load Plants
          </h3>
          <p className="text-muted-foreground mb-4">
            {String(error ?? "Unknown error")}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <Tabs
        value={activeCategory}
        onValueChange={handleCategoryChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {categories.map((category) => (
            <TabsTrigger
              key={category.value}
              value={category.value}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 py-1 text-sm font-medium ring-offset-background duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:scale-100 transform scale-95 gap-4 flex-row"
            >
              <img
                src={category.icon}
                alt={category.label}
                className="w-10 h-10 mb-2 sm:w-15 sm:h-15 md:w-20 md:h-20 lg:w-18 lg:h-18"
              />
              <div className="flex flex-col items-center">
                <span className="text-xl font-medium">{category.label}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="w-full">
          <TabsContent
            value={activeCategory}
            className="mt-0 transition-opacity duration-300 ease-in-out data-[state=inactive]:opacity-0 data-[state=active]:opacity-100"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                {categories.find((c) => c.value === activeCategory)?.label ??
                  "Plants"}
              </h3>
              <p className="text-muted-foreground">
                {total ?? products.length} plant
                {(total ?? products.length) !== 1 ? "s" : ""} found
              </p>
            </div>

            {!products || products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Leaf className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No plants found
                </h3>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((plant) => (
                    <PlantCard key={plant.id} plant={plant} />
                  ))}

                  {/* Skeletons appended while fetching next page */}
                  {isFetchingNextPage &&
                    Array.from({ length: skeletonCount }).map((_, i) => (
                      <SkeletonCard key={`skeleton-${i}`} />
                    ))}
                </div>

                <div className="mt-8 flex flex-col items-center">
                  {isFetchingNextPage ? (
                    <div className="text-sm text-gray-600 mb-4">
                      Loading more…
                    </div>
                  ) : hasNextPage ? (
                    <div className="text-sm text-gray-600 mb-4">
                      Scroll to load more
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 mb-4">
                      End of results
                    </div>
                  )}
                  <div
                    ref={sentinelRef}
                    style={{ width: "100%", height: 1 }}
                    aria-hidden
                  />
                </div>
              </>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
};

export default MainContent;
