
interface Plant {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string[];
  careInstructions: string[];
  imageUrl: string;
  imagePublicId: string;
  isFeatured: boolean;
  units: string;
  inStock: boolean;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export const filterPlantsByCategory = (
  plants: Plant[], 
  selectedCategory: string
): Plant[] => {
  if (selectedCategory === 'all') {
    return plants;
  }

  // Filter plants that have the selected category
  return plants.filter(plant => 
    plant.inStock && 
    plant.category.some(cat => 
      cat.toLowerCase() === selectedCategory.toLowerCase()
    )
  );
};

export const filterPlantsBySearch = (
  plants: Plant[], 
  searchQuery: string
): Plant[] => {
  if (!searchQuery.trim()) {
    return plants;
  }

  const query = searchQuery.toLowerCase().trim();
  
  return plants.filter(plant =>
    plant.name.toLowerCase().includes(query) ||
    plant.description.toLowerCase().includes(query) ||
    plant.category.some(cat => cat.toLowerCase().includes(query)) ||
    plant.careInstructions.some(instruction => 
      instruction.toLowerCase().includes(query)
    )
  );
};

// Get all unique categories from plants
export const extractCategoriesFromPlants = (plants: Plant[]): string[] => {
  const categoriesSet = new Set<string>();
  
  plants.forEach(plant => {
    plant.category.forEach(cat => {
      categoriesSet.add(cat);
    });
  });
  
  return Array.from(categoriesSet).sort();
};

// Get plant count for each category
export const getCategoryCount = (plants: Plant[], category: string): number => {
  if (category === 'all') {
    return plants.filter(plant => plant.inStock).length;
  }
  
  return plants.filter(plant => 
    plant.inStock && 
    plant.category.some(cat => cat.toLowerCase() === category.toLowerCase())
  ).length;
};