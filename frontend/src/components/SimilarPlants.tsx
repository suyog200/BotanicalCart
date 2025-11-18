import PlantCard from "./PlantCard";
import type { Plant } from "@/hooks/usePlants";
import { Loader } from "lucide-react";

interface SimilarPlantsProps {
  similarPlants: Plant[];
  isLoading?: boolean;
}

const SimilarPlants = ({ similarPlants, isLoading }: SimilarPlantsProps) => {
  if (isLoading) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Similar Plants
        </h2>
        <div className="flex items-center justify-center py-8">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (similarPlants.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Similar Plants
        </h2>
        <div className="text-center py-8 text-muted-foreground">
          No similar plants found
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        You might also like
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {similarPlants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  );
};

export default SimilarPlants;
