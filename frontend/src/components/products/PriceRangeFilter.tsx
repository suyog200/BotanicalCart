interface PriceRangeFilterProps {
  value: [number, number] | null;
  onChange: (range: [number, number] | null) => void;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  value,
  onChange,
}) => {
  const handleMinChange = (min: string) => {
    const minNum = min ? Number(min) : 0;
    const maxNum = value?.[1] || 0;
    if (min && value?.[1]) {
      onChange([minNum, maxNum]);
    } else if (min) {
      onChange([minNum, 10000]); // Default max
    } else if (value?.[1]) {
      onChange([0, maxNum]);
    } else {
      onChange(null);
    }
  };

  const handleMaxChange = (max: string) => {
    const minNum = value?.[0] || 0;
    const maxNum = max ? Number(max) : 0;
    if (max && value?.[0]) {
      onChange([minNum, maxNum]);
    } else if (max) {
      onChange([0, maxNum]);
    } else if (value?.[0]) {
      onChange([minNum, 10000]); // Default max
    } else {
      onChange(null);
    }
  };

  return (
    <div>
      <h3 className="font-medium mb-2">Price Range</h3>

      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min"
          value={value?.[0] || ""}
          onChange={(e) => handleMinChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <input
          type="number"
          placeholder="Max"
          value={value?.[1] || ""}
          onChange={(e) => handleMaxChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
    </div>
  );
};
