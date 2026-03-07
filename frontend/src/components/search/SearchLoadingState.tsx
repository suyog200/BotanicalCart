import React from "react";

const SearchLoadingState: React.FC = () => {
  return (
    <div className="p-6 flex flex-col items-center gap-3 text-gray-500">
      <svg className="h-6 w-6 animate-spin" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray="60 40"
        />
      </svg>
      <span className="text-sm">Searching for plants...</span>
    </div>
  );
};

export default SearchLoadingState;