import { Badge } from "@/components/ui/badge";

interface StockInfoProps {
  units: number;
  inStock: boolean;
}

const StockInfo = ({inStock }: StockInfoProps) => {
  return (
    <div className="text-2xl font-semibold">
      <Badge
        className={`${
          inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {inStock ? "In Stock" : "Out of Stock"}
      </Badge>
    </div>
  );
};

export default StockInfo;
