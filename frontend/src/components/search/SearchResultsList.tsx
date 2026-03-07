import React, { forwardRef } from "react";

type SearchProduct = {
  id: string;
  name: string;
  price?: number;
  imageUrl?: string;
};

interface SearchResultsListProps {
  results: SearchProduct[];
  highlightIndex: number;
  onItemClick: (productId: string) => void;
  onMouseEnter: (index: number) => void;
}

const SearchResultsList = forwardRef<HTMLUListElement, SearchResultsListProps>(
  ({ results, highlightIndex, onItemClick, onMouseEnter }, ref) => {
    return (
      <div
        className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#CBD5E0 #F7FAFC",
        }}
      >
        <ul ref={ref} className="py-2" role="listbox" aria-label="Search results">
          {results.map((product, idx) => (
            <SearchResultItem
              key={product.id}
              product={product}
              index={idx}
              isHighlighted={highlightIndex === idx}
              onClick={() => onItemClick(product.id)}
              onMouseEnter={() => onMouseEnter(idx)}
            />
          ))}
        </ul>

        {/* Custom Scrollbar Styles */}
        <style>{`
          .scrollbar-thin::-webkit-scrollbar {
            width: 6px;
          }
          
          .scrollbar-thin::-webkit-scrollbar-track {
            background: #f7fafc;
            border-radius: 3px;
          }
          
          .scrollbar-thin::-webkit-scrollbar-thumb {
            background: #cbd5e0;
            border-radius: 3px;
          }
          
          .scrollbar-thin::-webkit-scrollbar-thumb:hover {
            background: #a0aec0;
          }
        `}</style>
      </div>
    );
  }
);

SearchResultsList.displayName = "SearchResultsList";

// Search Result Item Component
interface SearchResultItemProps {
  product: SearchProduct;
  index: number;
  isHighlighted: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  product,
  isHighlighted,
  onClick,
  onMouseEnter,
}) => {
  return (
    <li
      role="option"
      aria-selected={isHighlighted}
      className={`
        flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-150
        ${
          isHighlighted
            ? "bg-primary/5 text-primary border-l-4 border-l-primary"
            : "hover:bg-gray-50"
        }
      `}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="flex-shrink-0">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-10 h-10 rounded-lg object-cover border border-gray-200"
            loading="lazy"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate text-gray-900">
          {product.name}
        </div>
        {product.price && (
          <div className="text-xs text-gray-500 mt-1">
            ₹{product.price.toLocaleString()}
          </div>
        )}
      </div>

      {/* Arrow Icon */}
      <div className="flex-shrink-0">
        <svg
          className={`h-4 w-4 transition-colors ${
            isHighlighted ? "text-primary" : "text-gray-400"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </li>
  );
};

export default SearchResultsList;