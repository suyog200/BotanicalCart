interface Plant {
  id: string;
  name: string;
  description: string;
  price: number;
  categories: { id: string; name: string; slug?: string }[]; // Updated to match new structure
  careInstructions: string[];
  imageUrl: string;
  imagePublicId: string;
  isFeatured: boolean;
  units: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export const filterPlantsByCategory = (
  plants: Plant[],
  selectedCategory: string
): Plant[] => {
  if (selectedCategory === "all") {
    return plants;
  }

  // Filter plants that have the selected category
  return plants.filter(
    (plant) =>
      plant.inStock &&
      plant.categories?.some(
        (cat) =>
          cat.slug?.toLowerCase() === selectedCategory.toLowerCase() ||
          cat.name?.toLowerCase() === selectedCategory.toLowerCase()
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

  return plants.filter(
    (plant) =>
      plant.name.toLowerCase().includes(query) ||
      plant.description.toLowerCase().includes(query) ||
      plant.categories?.some(
        (cat) =>
          cat.name?.toLowerCase().includes(query) ||
          cat.slug?.toLowerCase().includes(query)
      ) ||
      plant.careInstructions?.some((instruction) =>
        instruction.toLowerCase().includes(query)
      )
  );
};

// Get all unique categories from plants
export const extractCategoriesFromPlants = (plants: Plant[]): string[] => {
  const categoriesSet = new Set<string>();

  plants.forEach((plant) => {
    // Add safety check for undefined/null categories
    if (plant.categories && Array.isArray(plant.categories)) {
      plant.categories.forEach((cat) => {
        if (cat && cat.name && typeof cat.name === "string") {
          categoriesSet.add(cat.name);
        }
      });
    }
  });

  return Array.from(categoriesSet).sort();
};

// Get plant count for each category
export const getCategoryCount = (plants: Plant[], category: string): number => {
  if (category === "all") {
    return plants.filter((plant) => plant.inStock).length;
  }

  return plants.filter(
    (plant) =>
      plant.inStock &&
      plant.categories?.some(
        (cat) =>
          cat.slug?.toLowerCase() === category.toLowerCase() ||
          cat.name?.toLowerCase() === category.toLowerCase()
      )
  ).length;
};
