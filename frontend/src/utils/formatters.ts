// utils/formatters.ts
export const formatCategories = (categories: string | string[]): string => {
  if (Array.isArray(categories)) {
    return categories
      .map(cat => cat.charAt(0).toUpperCase() + cat.slice(1))
      .join(', ');
  }
  return typeof categories === 'string' 
    ? categories.charAt(0).toUpperCase() + categories.slice(1)
    : '';
};