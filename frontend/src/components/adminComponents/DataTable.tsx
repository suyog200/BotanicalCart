import { RotateCw } from "lucide-react";
import { useEffect, useRef, useCallback } from "react";
import ProductTableAction from "./ProductTableAction";

interface Column<T> {
  key: string;
  header: string;
  className?: string;
  render?: (item: T, index: number) => React.ReactNode;
  hideOnMobile?: boolean;
}

interface Action<T> {
  label: string;
  onClick: (item: T) => void;
  className?: string;
  icon?: React.ReactNode;
  isLoading?: (item: T) => boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
  isLoading?: boolean;
  isLoadingMore?: boolean;
  hasNextPage?: boolean;
  onRefresh?: () => void | Promise<void>;
  onLoadMore?: () => void | Promise<void>;
  title?: string;
  emptyMessage?: string;
  getItemId: (item: T) => string;
  loadingStates?: Map<string, boolean>;
}

const DataTable = <T,>({
  data,
  columns,
  actions = [],
  isLoading,
  isLoadingMore,
  hasNextPage,
  onRefresh,
  onLoadMore,
  title,
  emptyMessage = "No data available.",
  getItemId,
  loadingStates = new Map(),
}: DataTableProps<T>) => {
  // Intersection Observer setup for infinite scroll
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastItemElementRef = useCallback(
    (node: HTMLTableRowElement) => {
      if (isLoadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && onLoadMore) {
            onLoadMore();
          }
        },
        {
          threshold: 1.0,
          rootMargin: "100px",
        }
      );

      if (node) observerRef.current.observe(node);
    },
    [isLoadingMore, hasNextPage, onLoadMore]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 py-5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
          <p className="text-[var(--color-hero-text-subtitle)]">
            Loading data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 py-5 flex flex-col justify-between">
      <div className="w-full">
        {(title || onRefresh) && (
          <div className="flex justify-between items-center mb-1">
            {title && <h2 className="pb-4 text-lg font-medium">{title}</h2>}
            {onRefresh && (
              <button
                className="text-sm text-[var(--color-primary)] cursor-pointer flex items-center hover:text-[var(--color-primary-dull)] transition-colors"
                onClick={onRefresh}
                disabled={isLoading}
              >
                <RotateCw
                  className={`inline-block mr-1 h-4 w-4 ${
                    isLoading ? "animate-spin" : ""
                  }`}
                />
                Refresh
              </button>
            )}
          </div>
        )}

        <div className="flex flex-col items-center w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-4 py-3 font-semibold truncate ${
                      column.hideOnMobile ? 'max-sm:hidden' : ''
                    } ${column.className || ''}`}
                  >
                    {column.header}
                  </th>
                ))}
                {actions.length > 0 && (
                  <th className="px-4 py-3 font-semibold truncate">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {data.length === 0 && (
                <tr>
                  <td colSpan={columns.length + (actions.length > 0 ? 1 : 0)} className="text-center py-10 text-gray-400">
                    {emptyMessage}
                  </td>
                </tr>
              )}
              {data.map((item, index) => {
                const itemId = getItemId(item);
                const isLastItem = index === data.length - 1;
                const isItemLoading = loadingStates.get(itemId);

                return (
                  <tr
                    key={itemId}
                    ref={isLastItem ? lastItemElementRef : null}
                    className={`border-t border-gray-500/20 ${
                      isItemLoading ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-4 py-3 ${
                          column.hideOnMobile ? 'max-sm:hidden' : ''
                        } ${column.className || ''}`}
                      >
                        {column.render 
                          ? column.render(item, index)
                          : String((item as any)[column.key] || '')
                        }
                      </td>
                    ))}
                    {actions.length > 0 && (
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end space-x-2">
                            <ProductTableAction 
                                onEdit={() => actions[0].onClick(item)}
                                onDelete={() => actions[1].onClick(item)}
                                isDeleting={actions[1].isLoading ? actions[1].isLoading(item) : false}
                            />  
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Loading indicator for more data */}
          {isLoadingMore && (
            <div className="w-full py-4 flex justify-center items-center border-t border-gray-500/20">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--color-primary)]"></div>
              <span className="ml-2 text-sm text-gray-500">
                Loading more data...
              </span>
            </div>
          )}

          {/* End of list indicator */}
          {!hasNextPage && data.length > 0 && !isLoadingMore && (
            <div className="w-full py-4 text-center border-t border-gray-500/20">
              <span className="text-sm text-gray-400">
                You've reached the end of the list
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTable;