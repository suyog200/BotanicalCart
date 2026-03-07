import { useEffect, useRef, type JSX } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../api/api"; 

type Product = {
  id: string;
  name: string;
  imageUrl?: string | null;
};

const PAGE_LIMIT = 20;

const fetchSearchPage = async ({
  queryKey,
  pageParam = 1,
}: {
  queryKey: [string, string];
  pageParam?: number;
}) => {
  const [, q] = queryKey;
  const resp = await api.get(
    `/api/v1/products/search?q=${encodeURIComponent(
      q
    )}&page=${pageParam}&limit=${PAGE_LIMIT}`
  );

  return {
    items: resp.data.data as Product[],
    total: resp.data.total as number,
    page: resp.data.page ?? pageParam,
    limit: resp.data.limit ?? PAGE_LIMIT,
  };
};

export default function SearchResults(): JSX.Element {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const q = (searchParams.get("q") ?? "").trim();

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    status,
  } = useInfiniteQuery({
    queryKey: ["searchResults", q],
    //@ts-ignore
    queryFn: fetchSearchPage,
    enabled: q.length > 0,
    getNextPageParam: (lastPage) => {
      const fetched = (lastPage.page ?? 1) * (lastPage.limit ?? PAGE_LIMIT);
      if ((lastPage.total ?? 0) > fetched) {
        return (lastPage.page ?? 1) + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5, 
  });

  const products: Product[] = data ? data.pages.flatMap((p) => p.items) : [];
  const total: number = data?.pages?.[0]?.total ?? 0;

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current || !hasNextPage || isFetchingNextPage) return;

    const node = sentinelRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        });
      },
      {
        root: null,
        rootMargin: "400px",
        threshold: 0.1,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Handle product click with proper navigation
  const handleProductClick = (productId: string) => {
    navigate(`/plants-details/${productId}`);
  };

  if (!q) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">Search</h1>
          <p className="text-gray-600">Enter a search term to find plants.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="animate-spin h-12 w-12 border-b-2 border-primary mx-auto mb-4 rounded-full" />
          <p className="text-gray-600">Searching for "{q}" …</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-red-600 mb-4">
            Failed to load search results.
            {error instanceof Error && ` Error: ${error.message}`}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
            >
              Back Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-6xl text-gray-300 mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No results found
          </h3>
          <p className="text-gray-600 mb-6">
            No products match "{q}". Try different keywords.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Search results for "{q}"</h1>
          <div className="text-sm text-gray-600">
            Showing {products.length} of {total} results
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <article
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.imageUrl ?? "/placeholder.png"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.png";
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 truncate">
                  {product.name}
                </h3>
                </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center">
          {isFetchingNextPage ? (
            <div className="text-sm text-gray-600 mb-4 flex items-center gap-2">
              <div className="animate-spin h-4 w-4 border-b-2 border-primary rounded-full" />
              Loading more…
            </div>
          ) : hasNextPage ? (
            <div className="text-sm text-gray-600 mb-4">
              Scroll to load more
            </div>
          ) : products.length > 0 ? (
            <div className="text-sm text-gray-500 mb-4">End of results</div>
          ) : null}

          <div
            ref={sentinelRef}
            style={{ width: "100%", height: 1 }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
