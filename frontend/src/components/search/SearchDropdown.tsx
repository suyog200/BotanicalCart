import { forwardRef } from "react";
import type { ReactNode } from "react";

interface SearchDropdownProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
}

const SearchDropdown = forwardRef<HTMLDivElement, SearchDropdownProps>(
  ({ isOpen, children, className = "" }, ref) => {
    if (!isOpen) return null;

    return (
      <>
        <div
          ref={ref}
          className={`absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden ${className}`}
          style={{
            animation: "fadeInScale 0.15s ease-out forwards",
          }}
        >
          {children}
        </div>

        {/* CSS Animation */}
        <style>{`
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: translateY(-8px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}</style>
      </>
    );
  }
);

SearchDropdown.displayName = "SearchDropdown";

export default SearchDropdown;