import { Edit } from "lucide-react";
import type { Category } from "@/types/categoryTypes";

interface CategoryTableActionsProps {
  category: Category;
  onEdit: (category: Category) => void;
}

const CategoryTableActions = ({
  category,
  onEdit,
}: CategoryTableActionsProps) => {
  const handleEdit = () => {
    onEdit(category);
  };


  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleEdit}
        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Edit category"
      >
        <Edit className="h-4 w-4" />
      </button>
    </div>
  );
};

export default CategoryTableActions;
