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
      <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Price Range
      </h3>

      <div className="space-y-3">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
            ₹
          </span>
          <input
            type="number"
            placeholder="Min"
            value={value?.[0] || ""}
            onChange={(e) => handleMinChange(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg pl-8 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-700 placeholder:text-gray-400 hover:border-gray-300 transition-colors"
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="h-px w-3 bg-gray-300"></div>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
            ₹
          </span>
          <input
            type="number"
            placeholder="Max"
            value={value?.[1] || ""}
            onChange={(e) => handleMaxChange(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg pl-8 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-700 placeholder:text-gray-400 hover:border-gray-300 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};
