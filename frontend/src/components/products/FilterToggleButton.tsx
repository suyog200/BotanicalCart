interface FilterToggleButtonProps {
  onClick: () => void;
  activeFiltersCount?: number;
}

export const FilterToggleButton: React.FC<FilterToggleButtonProps> = ({
  onClick,
  activeFiltersCount = 0,
}) => {
  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed bottom-6 right-6 z-30 bg-primary text-white px-6 py-3 rounded-full shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2 font-medium"
      aria-label="Open filters"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
      <span>Filters</span>
      {activeFiltersCount > 0 && (
        <span className="bg-white text-primary px-2 py-0.5 rounded-full text-xs font-bold">
          {activeFiltersCount}
        </span>
      )}
    </button>
  );
};
