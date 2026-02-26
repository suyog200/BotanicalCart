import React from "react";
import { Badge } from "@/components/ui/badge";
import { getCategoryColor } from "@/lib/colorCategories";
import type { Category } from "@/types/types";

interface ProductHeaderProps {
  plant: {
    name: string;
    categories: Category[];
    isFeatured?: boolean;
  };
  averageRating: number;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  plant,
}) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {plant.categories?.map((cat, index) => (
          <Badge
            key={cat.id || index}
            className={getCategoryColor(cat.name || cat.slug || "")}
          >
            {cat.name}
          </Badge>
        ))}
        {plant.isFeatured && (
          <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
        )}
      </div>
      <h1 className="text-3xl font-bold text-foreground mt-2">{plant.name}</h1>
    </div>
  );
};

export default ProductHeader;
