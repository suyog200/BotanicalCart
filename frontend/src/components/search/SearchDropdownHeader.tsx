import React from "react";

interface SearchDropdownHeaderProps {
  isLoading: boolean;
  resultsCount: number;
}

const SearchDropdownHeader: React.FC<SearchDropdownHeaderProps> = ({
  isLoading,
  resultsCount,
}) => {
  return (
    <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">
          {isLoading ? "Searching..." : "Search Results"}
        </h3>
        {!isLoading && resultsCount > 0 && (
          <span className="text-xs text-gray-500">
            {resultsCount} result{resultsCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchDropdownHeader;