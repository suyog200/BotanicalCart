import { Edit, Trash2, Loader } from "lucide-react";

interface ProductTableActionProps {
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
}

const ProductTableAction = ({
  onEdit,
  onDelete,
  isDeleting = false,
}: ProductTableActionProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onEdit}
        disabled={isDeleting}
        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Edit product"
      >
        <Edit className="h-4 w-4" />
      </button>

      <button
        onClick={onDelete}
        disabled={isDeleting}
        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title={isDeleting ? "Deleting..." : "Delete product"}
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

export default ProductTableAction;
