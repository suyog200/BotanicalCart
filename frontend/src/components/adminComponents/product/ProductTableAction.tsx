import { Edit, Eye, EyeOff, Loader } from "lucide-react";

interface ProductTableActionProps {
  onEdit: () => void;
  onToggleVisibility: () => void;
  isVisible: boolean;
  isToggling?: boolean;
}

const ProductTableAction = ({
  onEdit,
  onToggleVisibility,
  isVisible,
  isToggling = false,
}: ProductTableActionProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onEdit}
        disabled={isToggling}
        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Edit product"
      >
        <Edit className="h-4 w-4" />
      </button>

      <button
        onClick={onToggleVisibility}
        disabled={isToggling}
        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title={
          isToggling
            ? "Toggling..."
            : isVisible
              ? "Hide product"
              : "Show product"
        }
      >
        {isToggling ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : isVisible ? (
          <Eye className="h-4 w-4" />
        ) : (
          <EyeOff className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};

export default ProductTableAction;
