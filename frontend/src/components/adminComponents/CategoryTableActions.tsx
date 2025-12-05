import { Edit, Trash2, Loader } from "lucide-react";
import type { Category } from "@/types/categoryTypes";

interface CategoryTableActionsProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  isDeleting?: boolean;
}

const CategoryTableActions = ({
  category,
  onEdit,
  onDelete,
  isDeleting = false,
}: CategoryTableActionsProps) => {
  const handleEdit = () => {
    onEdit(category);
  };

  const handleDelete = () => {
    onDelete(category);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleEdit}
        disabled={isDeleting}
        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Edit category"
      >
        <Edit className="h-4 w-4" />
      </button>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title={isDeleting ? "Deleting..." : "Delete category"}
      >
        {isDeleting ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};

export default CategoryTableActions;
