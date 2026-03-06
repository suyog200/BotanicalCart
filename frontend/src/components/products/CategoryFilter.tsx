import { useCategories } from "@/hooks/useCategories";
import type { Category } from "@/types/categoryTypes";

interface CategoryFilterProps {
  selected: string[];
  onChange: (ids: string[]) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ selected, onChange }) => {
  const { data: categories, isLoading } = useCategories();

  const toggle = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter((c) => c !== id)
        : [...selected, id]
    );
  };

  return (
    <div>
      <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
        Category
      </h3>

      <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
        {isLoading ? (
          // Reserve space to avoid CLS while categories load
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          categories?.map((cat: Category) => {
            const isSelected = selected.includes(cat.id); // compute once

            return (
              <label
                key={cat.id}
                className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 -mx-2 px-2 py-1.5 rounded-lg transition-colors"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggle(cat.id)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 border-2 rounded transition-all flex items-center justify-center ${
                    isSelected ? "bg-primary border-primary" : "border-gray-300 group-hover:border-primary"
                  }`}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-gray-700 group-hover:text-gray-900 text-sm transition-colors">
                  {cat.name}
                </span>
              </label>
            );
          })
        )}
      </div>
    </div>
  );
};