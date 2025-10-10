import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Loader } from "lucide-react";
import PlantCard from "./PlantCard";
import { Pagination } from "./Pagination";
import { usePlants } from "@/hooks/usePlants";
import { defaultCategories } from "@/data/plantsData";
import {
  filterPlantsByCategory,
  extractCategoriesFromPlants,
} from "@/utils/categoryFilters";

const PLANTS_PER_PAGE = 6;


const MainContent = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch plants from API
  const { plants, isLoading, error, refetch } = usePlants();

  // Create categories dynamically from API data + default categories
  const categories = useMemo(() => {
    if (plants.length === 0) return defaultCategories;

    // Extract unique categories from plants
    const apiCategories = extractCategoriesFromPlants(plants);

    // Create category objects with icons
    const dynamicCategories = apiCategories.map((cat) => {
      const defaultCat = defaultCategories.find(
        (defCat) => defCat.value.toLowerCase() === cat.toLowerCase()
      );

      return {
        value: cat.toLowerCase(),
        label: cat,
        icon: defaultCat?.icon || "/icons/default-plant.svg", // fallback icon
      };
    });

    // Always include "all" category at the beginning
    return [
      defaultCategories[0], // "All Plants"
      ...dynamicCategories.filter((cat) => cat.value !== "all"),
    ];
  }, [plants]);

  // Filter plants based on category and search
  const filteredPlants = useMemo(() => {
    let filtered = filterPlantsByCategory(plants, activeCategory);
    return filtered;
  }, [plants, activeCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPlants.length / PLANTS_PER_PAGE);
  const currentPlants = filteredPlants.slice(
    (currentPage - 1) * PLANTS_PER_PAGE,
    currentPage * PLANTS_PER_PAGE
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
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
  if (error) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Leaf className="h-16 w-16 text-red-400 mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Failed to Load Plants
          </h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={refetch}
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
          {categories.map((category) => {
            return (
              <TabsTrigger
                key={category.value}
                value={category.value}
                className="
                  inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 py-1 text-sm font-medium
                  ring-offset-background
                  duration-300 ease-in-out
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                  disabled:pointer-events-none disabled:opacity-50
                  data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:scale-100
                  transform scale-95
                  gap-4 flex-row
                "
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
            );
          })}
        </TabsList>

        {categories.map((category) => (
          <div key={category.value} className="w-full">
            <TabsContent
              value={category.value}
              className="mt-0 transition-opacity duration-300 ease-in-out data-[state=inactive]:opacity-0 data-[state=active]:opacity-100"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  {category.label}
                </h3>
                <p className="text-muted-foreground">
                  {filteredPlants.length} plant
                  {filteredPlants.length !== 1 ? "s" : ""} found
                </p>
              </div>

              {currentPlants.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Leaf className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No plants found
                  </h3>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentPlants.map((plant) => (
                      <PlantCard key={plant.id} plant={plant} />
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  )}
                </>
              )}
            </TabsContent>
          </div>
        ))}
      </Tabs>
    </main>
  );
};

export default MainContent;
