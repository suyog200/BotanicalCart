import { Package, MoveUp, MoveDown, SquarePen, Search, X } from "lucide-react";
import OverviewCards from "@/components/adminComponents/OverviewCards";
import ProductTable from "@/components/adminComponents/product/ProductTable";
import { useState } from "react";
import AddProductModal from "@/components/adminComponents/product/AddProductModal";
import { calculateProductStats } from "@/utils/ProductStatsCalu";
import type { Product } from "@/types/types";
import { useAdminProducts } from "@/components/adminComponents/product/useAdminProducts";
import type { ProductData } from "@/api/products";
import { useDebounce } from "@/hooks/useDebounce";

const ProductsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Debounce search query
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Use the custom hook for data fetching
  const {
    products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    createProduct,
    updateProduct,
    isCreating,
    isUpdating,
  } = useAdminProducts(5, debouncedSearch);

  const stats = calculateProductStats(products);

  const overviewCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      iconClassName: "text-[var(--color-primary)]",
    },
    {
      title: "Active Products",
      value: stats.activeProducts,
      icon: MoveUp,
      iconClassName: "text-green-500",
    },
    {
      title: "Out of Stock",
      value: stats.outOfStock,
      icon: MoveDown,
      iconClassName: "text-red-500",
    },
    {
      title: "Featured Products",
      value: stats.featured,
      icon: SquarePen,
      iconClassName: "text-blue-500",
    },
  ];

  // Convert form data to API data format
  const convertFormDataToProductData = (formData: any): ProductData => {
    return {
      name: formData.name,
      price:
        typeof formData.price === "string"
          ? parseFloat(formData.price)
          : formData.price,
      description: formData.description,
      units:
        typeof formData.units === "string"
          ? parseInt(formData.units, 10)
          : formData.units,
      isFeatured: formData.isFeatured,
      inStock: formData.inStock,
      categoryIds: formData.categoryIds,
      careInstructions: formData.careInstructions,
      image: formData.image,
    };
  };

  // Handle modal save (determines add or edit)
  const handleModalSave = (formData: any) => {
    const data = convertFormDataToProductData(formData);
    if (modalMode === "edit" && editingProduct) {
      updateProduct(
        { productId: editingProduct.id, data },
        {
          onSuccess: () => closeModal(),
        },
      );
    } else {
      createProduct(data, {
        onSuccess: () => closeModal(),
      });
    }
  };

  // Open add modal
  const openAddModal = () => {
    setModalMode("add");
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (product: Product) => {
    setModalMode("edit");
    const productForEdit = {
      ...product,
      // if backend returns product.categories as array of objects:
      categoryIds: product.categories?.map((c: any) => c.id) ?? [],
    } as unknown as Product;
    setEditingProduct(productForEdit);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    // Add a small delay before resetting other states to prevent conflicts
    setTimeout(() => {
      setEditingProduct(null);
      setModalMode("add");
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[var(--color-hero-text-heading)] mb-2">
            Manage Products & Inventory
          </h1>
          <p className="text-[var(--color-hero-text-subtitle)] text-lg">
            Add, update, and track your products and inventory seamlessly.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="bg-[var(--color-primary)] text-white py-2 px-4 rounded-md"
            onClick={openAddModal}
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Stats Cards Container */}
      <OverviewCards cards={overviewCards} />

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="mt-2 text-sm text-gray-600">
            Searching for:{" "}
            <span className="font-medium text-green-600">{searchQuery}</span>
          </p>
        )}
      </div>

      {/* Product Table */}
      <ProductTable
        products={products}
        isLoading={isLoading}
        isLoadingMore={isFetchingNextPage}
        hasNextPage={hasNextPage}
        onRefresh={() => {
          refetch();
        }}
        onLoadMore={() => {
          fetchNextPage();
        }}
        onEdit={openEditModal}
      />

      <AddProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleModalSave}
        isLoading={isCreating || isUpdating}
        mode={modalMode}
        productData={editingProduct}
      />
    </div>
  );
};

export default ProductsPage;
