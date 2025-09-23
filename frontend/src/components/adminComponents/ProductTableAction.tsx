import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductTableActionProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const ProductTableAction = ({ onEdit, onDelete }: ProductTableActionProps) => {
  return (
    <div className="flex items-center gap-2">
      {onEdit && (
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
        >
          <Edit className="h-4 w-4" />
        </Button>
      )}
      {onDelete && (
        <Button
          variant="outline"
          size="sm"
          onClick={onDelete}
          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 cursor-pointer"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default ProductTableAction;
