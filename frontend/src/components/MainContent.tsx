import { useMemo, useState } from "react";
import { plants, categories } from "@/data/plants"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; 

const PLANTS_PER_PAGE = 6;


const MainContent = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

    const filteredPlants = useMemo(() => {
    let filtered = plants;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(plant => plant.category === activeCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(plant =>
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
      <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
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
      </Tabs>
    </main>
  )
}

export default MainContent
