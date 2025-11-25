import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { api } from "@/api/api";
import SearchInput from "./search/SearchInput";
import SearchDropdown from "./search/SearchDropdown";
import SearchDropdownHeader from "./search/SearchDropdownHeader";
import SearchLoadingState from "./search/SearchLoadingState";
import SearchEmptyState from "./search/SearchEmptyState";
import SearchResultsList from "./search/SearchResultsList";
import SearchDropdownFooter from "./search/SearchDropdownFooter";

type SearchProduct = {
  id: string;
  name: string;
  price?: number;
  imageUrl?: string;
};

const searchProducts = async (q: string, limit = 10) => {
  const res = await api.get(
    `/api/v1/products/search?q=${encodeURIComponent(q)}&limit=${limit}`
  );
  return res.data;
};

interface SearchBarProps {
  autoFocus?: boolean;
  initialQuery?: string;
  placeholder?: string;
  onClose?: () => void;
}

export default function SearchBar({
  autoFocus = false,
  initialQuery = "",
  placeholder = "Search plants by name...",
  onClose,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebouncedValue(query, 350);
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const { data, isFetching } = useQuery({
    queryKey: ["productSearch", debouncedQuery],
    queryFn: () => searchProducts(debouncedQuery, 10),
    enabled: debouncedQuery.trim().length > 0,
    staleTime: 1000 * 60,
    placeholderData: (previousData) => previousData,
  });

  const results: SearchProduct[] = data?.data ?? [];


  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);


  useEffect(() => {
    if (debouncedQuery.trim().length > 0) {
      setOpen(true);
      setHighlightIndex(-1);
    } else {
      setOpen(false);
    }
  }, [debouncedQuery]);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !inputRef.current?.contains(e.target as Node) &&
        !dropdownRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);


  useEffect(() => {
    if (!open) setHighlightIndex(-1);
  }, [open]);


  useEffect(() => {
    if (highlightIndex >= 0 && listRef.current) {
      const list = listRef.current;
      const item = list.children[highlightIndex] as HTMLElement;

      if (item) {
        const itemTop = item.offsetTop;
        const itemBottom = itemTop + item.offsetHeight;
        const listScrollTop = list.scrollTop;
        const listHeight = list.clientHeight;

        if (itemTop < listScrollTop) {
          list.scrollTop = itemTop;
        } else if (itemBottom > listScrollTop + listHeight) {
          list.scrollTop = itemBottom - listHeight;
        }
      }
    }
  }, [highlightIndex]);


  const handleInputFocus = () => {
    if (debouncedQuery.trim() && results.length > 0) {
      setOpen(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && results.length === 0) {
      if (e.key === "ArrowDown" && debouncedQuery.trim()) {
        setOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHighlightIndex(0);
      } else {
        setHighlightIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && results[highlightIndex]) {
        handleResultClick(results[highlightIndex].id);
      } else if (debouncedQuery.trim()) {
        handleViewAllResults();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlightIndex(-1);
      onClose?.();
    }
  };

  const handleResultClick = (productId: string) => {
    setOpen(false);
    setQuery("");
    setHighlightIndex(-1);
    navigate(`/plants-details/${productId}`);
    onClose?.();
  };

  const handleViewAllResults = () => {
    navigate(`/search?q=${encodeURIComponent(debouncedQuery.trim())}`);
    setOpen(false);
    onClose?.();
  };

  const handleMouseEnterResult = (index: number) => {
    setHighlightIndex(index);
  };


  const renderDropdownContent = () => {
    if (isFetching) {
      return <SearchLoadingState />;
    }

    if (results.length === 0 && debouncedQuery.trim()) {
      return <SearchEmptyState query={debouncedQuery} />;
    }

    return (
      <SearchResultsList
        ref={listRef}
        results={results}
        highlightIndex={highlightIndex}
        onItemClick={handleResultClick}
        onMouseEnter={handleMouseEnterResult}
      />
    );
  };

  return (
    <div className="relative w-full max-w-xl">
      <SearchInput
        ref={inputRef}
        value={query}
        onChange={setQuery}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />

      <SearchDropdown ref={dropdownRef} isOpen={open}>
        <SearchDropdownHeader
          isLoading={isFetching}
          resultsCount={results.length}
        />

        {renderDropdownContent()}

        <SearchDropdownFooter
          query={debouncedQuery}
          onViewAllClick={handleViewAllResults}
          isVisible={
            !isFetching &&
            results.length > 0 &&
            debouncedQuery.trim().length > 0
          }
        />
      </SearchDropdown>
    </div>
  );
}
