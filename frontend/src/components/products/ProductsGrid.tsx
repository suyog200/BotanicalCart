import PlantCard from "../PlantCard";
import type { Plant } from "@/types/types";

interface ProductsGridProps {
  products: Plant[];
}

export const ProductsGrid: React.FC<ProductsGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <PlantCard key={product.id} plant={product} />
      ))}
    </div>
  );
};
