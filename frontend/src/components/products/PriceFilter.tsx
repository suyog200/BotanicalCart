export type SortOption = "default" | "price-low" | "price-high";

interface PriceFilterProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
  value,
  onChange,
}) => {
  const sortOptions = [
    { value: "default" as SortOption, label: "Default" },
    { value: "price-low" as SortOption, label: "Price: Low to High" },
    { value: "price-high" as SortOption, label: "Price: High to Low" },
  ];

  return (
    <div>
      <h3 className="font-medium mb-2">Sort by Price</h3>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none cursor-pointer"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
