import React from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface ProductActionsProps {
  plant: {
    id: string;
    name: string;
    price: number;
    inStock: boolean;
    units: number;
  };
  quantity: number;
  onAddToCart: () => void;
  onUpdateQuantity: (plantId: string, quantity: number) => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  plant,
  quantity,
  onAddToCart,
  onUpdateQuantity,
}) => {
  const handleBuyNow = () => {
    if (!plant.inStock || quantity === 0) {
      toast.error("Please add item to cart first");
      return;
    }
    // Add your buy now logic here
    toast.success("Redirecting to checkout...");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-primary">₹{plant.price}</span>
      </div>

      {/* Cart Actions */}
      <div className="flex items-center justify-between gap-2">
        {quantity === 0 ? (
          <Button
            className={`flex items-center gap-2 flex-1 ${
              plant.inStock
                ? "bg-white text-black border border-gray-300 hover:bg-gray-100"
                : "bg-gray-400 cursor-not-allowed text-gray-600"
            }`}
            onClick={onAddToCart}
            disabled={!plant.inStock}
          >
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 14 14" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {plant.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        ) : (
          <>
            {/* Quantity Controls */}
            <div className="flex items-center justify-center gap-2 bg-white rounded border border-gray-300">
              <button 
                onClick={() => onUpdateQuantity(plant.id, quantity - 1)} 
                className="px-3 py-2 hover:bg-gray-100 transition-colors text-black"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-2 text-black font-medium min-w-[2rem] text-center">
                {quantity}
              </span>
              <button 
                onClick={() => onUpdateQuantity(plant.id, quantity + 1)} 
                className="px-3 py-2 hover:bg-gray-100 transition-colors text-black"
                disabled={quantity >= plant.units}
              >
                +
              </button>
            </div>

            {/* Buy Now Button */}
            <Button
              className={`flex-1 ${
                plant.inStock && quantity > 0
                  ? "bg-primary hover:bg-primary/80"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={handleBuyNow}
              disabled={!plant.inStock || quantity === 0}
            >
              Buy Now
            </Button>
          </>
        )}
      </div>

      {/* Stock Warning */}
      {quantity >= plant.units && plant.inStock && (
        <p className="text-sm text-red-600 text-center">
          Maximum available quantity reached
        </p>
      )}
    </div>
  );
};

export default ProductActions;