import { ArrowRight } from "lucide-react";

interface SearchDropdownFooterProps {
  query: string;
  onViewAllClick: () => void;
  isVisible: boolean;
}

export default function SearchDropdownFooter({
  query,
  onViewAllClick,
  isVisible,
}: SearchDropdownFooterProps) {
  if (!isVisible) return null;

  return (
    <div className="border-t border-gray-100 bg-gray-50 px-3 py-2 sm:px-4">
      <button
        onClick={onViewAllClick}
        className="flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 sm:px-4"
      >
        <span>View all results for "{query}"</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
