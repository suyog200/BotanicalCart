import React from "react";

interface SearchEmptyStateProps {
  query: string;
}

const SearchEmptyState: React.FC<SearchEmptyStateProps> = ({ query }) => {
  return (
    <div className="p-6 text-center">
      <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <p className="text-sm text-gray-600 font-medium mb-1">No plants found</p>
      <p className="text-xs text-gray-500">
        Try searching with different keywords
      </p>
    </div>
  );
};

export default SearchEmptyState;