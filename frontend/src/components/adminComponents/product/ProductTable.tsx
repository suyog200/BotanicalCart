import { formatCategories } from "@/utils/formatters";
import { Edit, Eye } from "lucide-react";
import type { Product } from "@/types/types";
import { api } from "@/api/api";
import { useState } from "react";
import toast from "react-hot-toast";
import DataTable from "../DataTable";

interface ProductTableProps {
  products: Product[];
  isLoading?: boolean;
  isLoadingMore?: boolean;
  hasNextPage?: boolean;
  onRefresh?: () => void | Promise<void>;
  onLoadMore?: () => void | Promise<void>;
  onEdit?: (product: Product) => void;
}

const ProductTable = ({
  products,
  isLoading,
  isLoadingMore,
  hasNextPage,
  onRefresh,
  onLoadMore,
  onEdit,
}: ProductTableProps) => {
  const [togglingProducts, setTogglingProducts] = useState<Set<string>>(
    new Set(),
  );
  const [togglingVisibility, setTogglingVisibility] = useState<Set<string>>(
    new Set(),
  );

  // Create loading states map
  const loadingStates = new Map<string, boolean>();
  [...togglingProducts, ...togglingVisibility].forEach((id) => {
    loadingStates.set(id, true);
  });

  const handleInStockToggle = async (product: Product) => {
    if (!product?.id) {
      toast.error("Invalid product ID");
      return;
    }
    setTogglingProducts((prev) => new Set(prev).add(product.id));

    try {
      const newInStockStatus = !product.inStock;
      const response = await api.patch(
        `/api/v1/admin/products/${product.id}/update-instock`,
        {
          inStock: newInStockStatus,
        },
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success(
          `${product.name} is now ${
            newInStockStatus ? "in stock" : "out of stock"
          }`,
        );

        if (onRefresh) {
          await onRefresh();
        }
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error: any) {
      console.error("Error toggling product stock status:", error);

      if (error.response?.status === 404) {
        toast.error("Product not found. It may have been deleted.");
        onRefresh?.();
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to update this product");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(`Failed to update stock status: ${error.message}`);
      } else {
        toast.error("Failed to update stock status. Please try again.");
      }

      // Refresh to revert any optimistic updates
      if (onRefresh) {
        await onRefresh();
      }
    } finally {
      setTogglingProducts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }
  };

  const handleVisibilityToggle = async (product: Product) => {
    if (!product?.id) {
      toast.error("Invalid product ID");
      return;
    }

    setTogglingVisibility((prev) => new Set(prev).add(product.id));

    try {
      const newVisibilityStatus = !product.isVisible;
      const response = await api.patch(
        `/api/v1/admin/products/${product.id}/visibility`,
        {
          isVisible: newVisibilityStatus,
        },
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success(
          `${product.name} is now ${newVisibilityStatus ? "visible" : "hidden"}`,
        );

        if (onRefresh) {
          await onRefresh();
        }
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error: any) {
      console.error("Error toggling product visibility:", error);

      if (error.response?.status === 404) {
        toast.error("Product not found. It may have been deleted.");
        onRefresh?.();
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to update this product");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(`Failed to update visibility: ${error.message}`);
      } else {
        toast.error("Failed to update visibility. Please try again.");
      }

      // Refresh to revert any optimistic updates
      if (onRefresh) {
        await onRefresh();
      }
    } finally {
      setTogglingVisibility((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }
  };

  const columns = [
    {
      key: "product",
      header: "Product",
      render: (product: Product) => (
        <div className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
          <div className="border border-gray-300 rounded overflow-hidden">
            <img src={product.imageUrl} alt="Product" className="w-16" loading="lazy"/>
          </div>
          <span className="truncate max-sm:hidden w-full">{product.name}</span>
          <span className="truncate max-md:hidden w-full flex gap-2">
            {product.isFeatured && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Featured
              </span>
            )}
            {!product.isVisible && (
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Hidden
              </span>
            )}
          </span>
        </div>
      ),
      className: "px-0",
    },
    {
      key: "category",
      header: "Category",
      render: (product: Product) => formatCategories(product.categories ?? []),
    },
    {
      key: "price",
      header: "Selling Price",
      render: (product: Product) => `Rs ${product.price.toFixed(2)}`,
      hideOnMobile: true,
    },
    {
      key: "units",
      header: "Units",
    },
    {
      key: "inStock",
      header: "In Stock",
      render: (product: Product) => (
        <label
          className={`relative inline-flex items-center text-gray-900 gap-3 ${
            togglingProducts.has(product.id)
              ? "cursor-wait opacity-75"
              : "cursor-pointer"
          }`}
        >
          <input
            type="checkbox"
            className="sr-only peer"
            checked={product.inStock}
            onChange={() => handleInStockToggle(product)}
            disabled={togglingProducts.has(product.id)}
          />
          <div
            className={`w-12 h-7 rounded-full peer transition-colors duration-200 ${
              product.inStock ? "bg-blue-600" : "bg-slate-300"
            } ${togglingProducts.has(product.id) ? "animate-pulse" : ""}`}
          ></div>
          <span
            className={`dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-all duration-200 ease-in-out ${
              product.inStock ? "translate-x-5" : "translate-x-0"
            } ${togglingProducts.has(product.id) ? "shadow-md" : ""}`}
          ></span>
        </label>
      ),
    },
  ];

  // Define actions
  const actions = [
    {
      label: "Edit",
      onClick: (product: Product) => onEdit?.(product),
      icon: <Edit className="h-4 w-4" />,
      variant: "secondary" as const,
    },
    {
      label: "Toggle Visibility",
      onClick: handleVisibilityToggle,
      icon: <Eye className="h-4 w-4" />,
      variant: "secondary" as const,
      isLoading: (product: Product) => togglingVisibility.has(product.id),
    },
  ];

  return (
    <DataTable
      data={products}
      columns={columns}
      actions={actions}
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      hasNextPage={hasNextPage}
      onRefresh={onRefresh}
      onLoadMore={onLoadMore}
      title="All Products"
      emptyMessage="No products available."
      getItemId={(product) => product.id}
      loadingStates={loadingStates}
    />
  );
};

export default ProductTable;
