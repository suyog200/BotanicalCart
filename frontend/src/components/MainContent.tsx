import { useMemo, useState } from "react";
import { plants, categories } from "@/data/plantsData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Search } from "lucide-react";
import PlantCard from "./PlantCard";
import { Pagination } from "./Pagination";

const PLANTS_PER_PAGE = 6;

const MainContent = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlants = useMemo(() => {
    let filtered = plants.filter((plant) => plant.inStock);

    if (activeCategory !== "all") {
      filtered = filtered.filter((plant) => plant.category === activeCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (plant) =>
          plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          plant.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPlants.length / PLANTS_PER_PAGE);
  const currentPlants = filteredPlants.slice(
    (currentPage - 1) * PLANTS_PER_PAGE,
    currentPage * PLANTS_PER_PAGE
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    // Main Content
    <main className="container mx-auto px-4 py-12">
      <Tabs
        value={activeCategory}
        onValueChange={handleCategoryChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-5 mb-8 bg-sage/30 p-1 rounded-lg">
          {categories.map((category) => (
            <TabsTrigger
              key={category.value}
              value={category.value}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 cursor-pointer"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent
            key={category.value}
            value={category.value}
            className="mt-0"
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
                <p className="text-muted-foreground">
                  Try adjusting your search or browse other categories
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {currentPlants.map((plant) => (
                    <PlantCard key={plant.id} plant={plant} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
};

export default MainContent;
