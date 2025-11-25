import React from "react";
import { useNavigate } from "react-router-dom";

interface SearchDropdownFooterProps {
  query: string;
  onViewAllClick?: () => void;
  isVisible: boolean;
}

const SearchDropdownFooter: React.FC<SearchDropdownFooterProps> = ({
  query,
  onViewAllClick,
  isVisible,
}) => {
  const navigate = useNavigate();

  if (!isVisible) return null;

  const handleViewAllClick = () => {
    if (onViewAllClick) {
      onViewAllClick();
    }
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
      <button
        onClick={handleViewAllClick}
        className="w-full text-sm font-medium text-primary hover:text-primary/80 transition-colors text-center py-2 rounded-lg hover:bg-primary/5"
      >
        View all results for "{query}"
      </button>
    </div>
  );
};

export default SearchDropdownFooter;
