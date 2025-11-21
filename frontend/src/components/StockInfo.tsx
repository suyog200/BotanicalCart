import React from "react";
import { Badge } from "@/components/ui/badge";

interface StockInfoProps {
  units: number;
  inStock: boolean;
}

const StockInfo: React.FC<StockInfoProps> = ({ units, inStock }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm gap-1">
          <span className="text-muted-foreground">Available Units:</span>
          <span className="font-medium">{units} left</span>
        </div>
        <Badge
          className={`${
            inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </Badge>
      </div>
      
      {/* Stock level indicator */}
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              units > 10
                ? "bg-green-500"
                : units > 5
                ? "bg-yellow-500"
                : units > 0
                ? "bg-red-500"
                : "bg-gray-400"
            }`}
            style={{
              width: `${Math.min((units / 20) * 100, 100)}%`,
            }}
          ></div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {units > 10
            ? "Good stock level"
            : units > 5
            ? "Low stock"
            : units > 0
            ? "Very low stock"
            : "Out of stock"}
        </p>
      </div>
    </div>
  );
};

export default StockInfo;