import {  Package, MoveUp, MoveDown, SquarePen  } from "lucide-react";
import OverviewCards from "@/components/adminComponents/OverviewCards";
import ProductTable from "@/components/adminComponents/ProductTable";
import { useState } from "react";
import AddProductModal from "@/components/adminComponents/AddProductModal";


const ProductsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stats = {
    totalProducts: 156,
    activeProducts: 23,
    outOfStock: 8,
    featured: 4,
  };

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

  function handleAddProduct(data: any) {
      const transformed = {
    ...data,
    careInstructions: data.careInstructions.map((item: any) => item.value),
  };
  console.log("Transformed data:", transformed);
  }

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
          <button className="bg-[var(--color-primary)] text-white py-2 px-4 rounded-md" onClick={() => setIsModalOpen(true)}>
            + Add Product
          </button>
          <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddProduct} />
        </div>
      </div>

      {/* Stats Cards Container */}
      <OverviewCards cards={overviewCards} />

      {/* Product Table */}
      <ProductTable />
    </div>
  );
};

export default ProductsPage;
