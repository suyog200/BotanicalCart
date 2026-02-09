import { useCategories } from "@/hooks/useCategories";
import type { Category } from "@/types/categoryTypes";

interface CategoryFilterProps {
  selected: string[];
  onChange: (ids: string[]) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selected,
  onChange,
}) => {
  const { data: categories } = useCategories();

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((c: string) => c !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div>
      <h3 className="font-medium mb-2">Category</h3>

      <div className="space-y-2">
        {categories?.map((cat: Category) => (
          <label key={cat.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(cat.id)}
              onChange={() => toggle(cat.id)}
            />
            {cat.name}
          </label>
        ))}
      </div>
    </div>
  );
};
