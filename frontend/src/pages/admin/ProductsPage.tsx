import { Package, MoveUp, MoveDown, SquarePen } from "lucide-react";
import OverviewCards from "@/components/adminComponents/OverviewCards";
import ProductTable from "@/components/adminComponents/ProductTable";
import { useEffect, useState } from "react";
import AddProductModal from "@/components/adminComponents/AddProductModal";
import { api } from "@/api/api";
import { calculateProductStats } from "@/utils/ProductStatsCalu";
import toast from "react-hot-toast";

const ProductsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false); 

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

    // Fetch products function
  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const response = await api.get("/api/v1/products");
      if (response.status === 200) {
        setProducts(response.data.data || response.data); 
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleAddProduct(data: any) {
    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("price", data.price.toString());
      formData.append("description", data.description);
      formData.append("units", data.units?.toString() || "0");
      formData.append("isFeatured", data.isFeatured?.toString() || "false");
      formData.append("inStock", data.inStock?.toString() || "true");

      if (Array.isArray(data.category)) {
        formData.append("category", JSON.stringify(data.category));
      }

      if (Array.isArray(data.careInstructions)) {
        formData.append(
          "careInstructions",
          JSON.stringify(data.careInstructions)
        );
      }

      if (data.image && data.image instanceof File) {
        formData.append("image", data.image);
      }

      const response = await api.post("/api/v1/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Product added successfully:", response.data);
        toast.success("Product added successfully!");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
          <button
            className="bg-[var(--color-primary)] text-white py-2 px-4 rounded-md"
            onClick={() => setIsModalOpen(true)}
          >
            Add Product
          </button>
          <AddProductModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleAddProduct}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Stats Cards Container */}
      <OverviewCards cards={overviewCards} />

      {/* Product Table */}
      <ProductTable 
        products={products} 
        isLoading={isLoadingProducts}
        onRefresh={fetchProducts}
      />
    </div>
  );
};

export default ProductsPage;
