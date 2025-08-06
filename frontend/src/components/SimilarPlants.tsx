import type { Plant } from "@/types/types";
import PlantCard from "./PlantCard";

interface SimilarPlantsProps {
    similarPlants: Plant[];
}


const SimilarPlants = ({ similarPlants }: SimilarPlantsProps) => {
  return (
    <div>
    {similarPlants.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Similar Plants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarPlants.map((similarPlant) => (
                <PlantCard key={similarPlant.id} plant={similarPlant} />
              ))}
            </div>
          </div>
        )}
    </div>
  )
}

export default SimilarPlants
