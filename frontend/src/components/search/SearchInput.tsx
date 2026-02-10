import React, { forwardRef } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    { value, onChange, onFocus, onKeyDown, placeholder, className = "" },
    ref,
  ) => {
    return (
      <div className={`relative ${className}`}>
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label="Search products"
          aria-expanded="false"
          aria-haspopup="listbox"
          aria-autocomplete="list"
          className="w-full px-3 py-1.5 lg:px-4 lg:py-2 pr-8 lg:pr-10 text-sm rounded-4xl border border-green-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
        />

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
