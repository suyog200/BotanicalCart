export const categoryColors: Record<string, string> = {
  indoor: "bg-green-100 text-green-800",
  outdoor: "bg-blue-100 text-blue-800",
  medicinal: "bg-purple-100 text-purple-800",
  flowers: "bg-pink-100 text-pink-800",
  "home decor": "bg-amber-100 text-amber-800",
  "home-decor": "bg-amber-100 text-amber-800",
  default: "bg-gray-100 text-gray-800",
};

// Helper function to get category color
export const getCategoryColor = (category: string): string => {
  const normalizedCategory = category.toLowerCase().replace(/\s+/g, "-");
  return categoryColors[normalizedCategory] || categoryColors.default;
};
