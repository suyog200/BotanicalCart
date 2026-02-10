import React, { forwardRef } from "react";

interface SearchDropdownProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const SearchDropdown = forwardRef<HTMLDivElement, SearchDropdownProps>(
  ({ children, isOpen }, ref) => {
    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className="absolute left-0 right-0 z-50 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
      >
        {children}
      </div>
    );
  }
);

SearchDropdown.displayName = "SearchDropdown";

export default SearchDropdown;