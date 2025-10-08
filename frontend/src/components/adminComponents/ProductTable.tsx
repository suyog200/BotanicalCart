import ProductTableAction from "./ProductTableAction";
import { formatCategories } from "@/utils/formatters";
import { RotateCw } from "lucide-react";
import type { Product } from "@/types/types";
import { api } from "@/api/api";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProductTableProps {
  products: Product[];
  isLoading?: boolean;
  onRefresh?: () => void | Promise<void>;
  onEdit?: (product: Product) => void;
}

const ProductTable = ({
  products,
  isLoading,
  onRefresh,
  onEdit,
}: ProductTableProps) => {
  const [deletingProducts, setDeletingProducts] = useState<Set<string>>(
    new Set()
  );

  const handleDelete = async (product: Product) => {
    if (!product?.id) {
      toast.error("Invalid product ID");
      return;
    }

    const confirmMessage = `Are you sure you want to delete "${product.name}"?\n\nThis action cannot be undone.`;
    const confirmed = window.confirm(confirmMessage);

    if (!confirmed) return;

    // Add product to deleting state
    setDeletingProducts((prev) => new Set(prev).add(product.id));

    try {
      // Make delete API call
      const response = await api.delete(`/api/v1/products/${product.id}`);

      if (response.status === 200 || response.status === 204) {
        toast.success(`"${product.name}" deleted successfully`);

        if (onRefresh) {
          await onRefresh();
        }
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error: any) {
      console.error("Error deleting product:", error);

      if (error.response?.status === 404) {
        toast.error("Product not found. It may have already been deleted.");
        onRefresh?.();
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to delete this product");
      } else if (error.response?.status === 409) {
        toast.error("Cannot delete product. It may have pending orders.");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(`Failed to delete product: ${error.message}`);
      } else {
        toast.error("Failed to delete product. Please try again.");
      }
    } finally {
      setDeletingProducts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 py-5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
          <p className="text-[var(--color-hero-text-subtitle)]">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 py-5 flex flex-col justify-between">
      <div className="w-full">
        <div className="flex justify-between items-center mb-1">
          <h2 className="pb-4 text-lg font-medium">All Products</h2>
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
        </div>
        <div className="flex flex-col items-center w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate max-sm:hidden">
                  Selling Price
                </th>
                <th className="px-4 py-3 font-semibold truncate">Units</th>
                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                <th className="px-4 py-3 font-semibold truncate">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.length === 0 && (
                <>
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-400">
                      No products available.
                    </td>
                  </tr>
                </>
              )}
              {products.map((product, index) => {
                const isDeleting = deletingProducts.has(product.id);

                return (
                  <tr
                    key={product.id ?? `fallback-${index}`}
                    className={`border-t border-gray-500/20 ${
                      isDeleting ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <div className="border border-gray-300 rounded overflow-hidden">
                        <img
                          src={product.imageUrl}
                          alt="Product"
                          className="w-16"
                        />
                      </div>
                      <span className="truncate max-sm:hidden w-full">
                        {product.name}
                      </span>
                      <span className="truncate max-md:hidden w-full">
                        {product.isFeatured && (
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            Featured
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {formatCategories(product.category)}
                    </td>
                    <td className="px-4 py-3 max-sm:hidden">
                      Rs {product.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">{product.units}</td>
                    <td className="px-4 py-3">
                      <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked={product.inStock ? true : false}
                        />
                        <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                        <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                      </label>
                    </td>
                    <td className="px-4 py-3">
                      <ProductTableAction
                        onEdit={() => onEdit?.(product)}
                        onDelete={() => handleDelete(product)}
                        isDeleting={isDeleting}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
