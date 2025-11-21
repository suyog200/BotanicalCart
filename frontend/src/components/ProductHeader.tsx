import React from "react";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { getCategoryColor } from "@/lib/colorCategories";

interface ProductHeaderProps {
  plant: {
    name: string;
    category: string[];
    isFeatured?: boolean;
  };
  averageRating: number;
  reviewCount: number;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  plant,
  averageRating,
  reviewCount,
}) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {plant.category.map((cat, index) => (
          <Badge key={index} className={getCategoryColor(cat)}>
            {cat.replace("-", " ")}
          </Badge>
        ))}
        {plant.isFeatured && (
          <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
        )}
      </div>
      <h1 className="text-3xl font-bold text-foreground mt-2">{plant.name}</h1>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(averageRating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {averageRating > 0 ? averageRating.toFixed(1) : "No rating"} 
          ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
        </span>
      </div>
    </div>
  );
};

export default ProductHeader;