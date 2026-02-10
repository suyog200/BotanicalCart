import { useState, useEffect } from "react";

interface QuantitySelectorProps {
  currentQuantity: number;
  availableUnits: number;
  onQuantityChange: (quantity: number) => void;
}

const DROPDOWN_THRESHOLD = 20;

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  currentQuantity,
  availableUnits,
  onQuantityChange,
}) => {
  const [inputValue, setInputValue] = useState(currentQuantity.toString());
  const [error, setError] = useState("");

  useEffect(() => {
    setInputValue(currentQuantity.toString());
  }, [currentQuantity]);

  // Use dropdown for small quantities, input for large quantities
  const useDropdown = availableUnits <= DROPDOWN_THRESHOLD;

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setError("");

    const numValue = parseInt(value, 10);

    if (value === "" || isNaN(numValue)) {
      return;
    }

    if (numValue < 1) {
      setError("Minimum quantity is 1");
      return;
    }

    if (numValue > availableUnits) {
      setError(`Only ${availableUnits} units available`);
      return;
    }

    onQuantityChange(numValue);
  };

  const handleInputBlur = () => {
    const numValue = parseInt(inputValue, 10);

    if (inputValue === "" || isNaN(numValue) || numValue < 1) {
      setInputValue(currentQuantity.toString());
      setError("");
      return;
    }

    if (numValue > availableUnits) {
      setInputValue(availableUnits.toString());
      onQuantityChange(availableUnits);
      setError("");
    }
  };

  if (useDropdown) {
    // Dropdown for products with stock <= 20
    const maxQuantity = Math.min(availableUnits, currentQuantity + 10);

    return (
      <div className="flex flex-col gap-1">
        <select
          className="outline-none bg-transparent cursor-pointer text-sm px-1 py-0.5 rounded border border-gray-300 hover:border-primary transition-colors"
          value={currentQuantity}
          onChange={(e) => onQuantityChange(Number(e.target.value))}
        >
          {Array.from({ length: maxQuantity }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <span className="text-[10px] text-gray-400">
          {availableUnits} available
        </span>
      </div>
    );
  }

  // Input field for products with stock > 20
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <input
          type="number"
          min="1"
          max={availableUnits}
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={handleInputBlur}
          className={`w-16 px-2 py-1 text-sm border rounded outline-none focus:ring-1 focus:ring-primary transition-all ${
            error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
          }`}
        />
        <span className="text-xs text-gray-500">/ {availableUnits}</span>
      </div>
      {error && <span className="text-[10px] text-red-500">{error}</span>}
    </div>
  );
};
