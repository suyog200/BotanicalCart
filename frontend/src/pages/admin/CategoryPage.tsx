import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import DataTable from "../../components/adminComponents/DataTable";
import AddCategoryModal from "../../components/adminComponents/AddCategoryModal";
import CategoryTableActions from "../../components/adminComponents/CategoryTableActions";
import { Button } from "../../components/ui/button";
import { api } from "../../api/api";
import type { Category, CategorySubmitData } from "@/types/categoryTypes";

interface Column<T> {
  key: string;
  header: string;
  className?: string;
  render?: (item: T, index: number) => React.ReactNode;
  hideOnMobile?: boolean;
}

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingStates, setLoadingStates] = useState(
    new Map<string, boolean>()
  );

  // Fetch categories
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/api/v1/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle add category
  const handleAddCategory = () => {
    setModalMode("add");
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  // Handle edit category
  const handleEditCategory = (category: Category) => {
    setModalMode("edit");
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  // Handle delete category
  const handleDeleteCategory = async (category: Category) => {
    if (!confirm(`Are you sure you want to delete "${category.name}"?`)) {
      return;
    }

    setLoadingStates((prev) => new Map(prev).set(category.id, true));

    try {
      await api.delete(`/api/categories/${category.id}`);
      await fetchCategories(); // Refresh the list
    } catch (error) {
      console.error("Failed to delete category:", error);
    } finally {
      setLoadingStates((prev) => {
        const newMap = new Map(prev);
        newMap.delete(category.id);
        return newMap;
      });
    }
  };

  // Handle toggle active status
  const handleToggleActive = async (category: Category) => {
    setLoadingStates((prev) => new Map(prev).set(category.id, true));

    try {
      await api.patch(`/api/v1/categories/${category.id}`, {
        isActive: !category.isActive,
      });
      await fetchCategories(); // Refresh the list
    } catch (error) {
      console.error("Failed to update category:", error);
    } finally {
      setLoadingStates((prev) => {
        const newMap = new Map(prev);
        newMap.delete(category.id);
        return newMap;
      });
    }
  };

  // Handle form submission
  const handleFormSubmit = async (formData: CategorySubmitData) => {
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("description", formData.description || "");
      submitData.append("isActive", formData.isActive.toString());

      if (formData.image) {
        submitData.append("image", formData.image);
      }

      if (modalMode === "edit" && selectedCategory) {
        await api.patch(`/api/v1/categories/${selectedCategory.id}`, submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await api.post("/api/v1/categories", submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setIsModalOpen(false);
      await fetchCategories(); // Refresh the list
    } catch (error) {
      console.error("Failed to save category:", error);
      // Optionally show user-friendly error message
    } finally {
      setIsSubmitting(false);
    }
  };

  // Define table columns
  const columns: Column<Category>[] = [
    {
      key: "image",
      header: "Image",
      className: "w-16",
      render: (category) => (
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
          {category.imageUrl ? (
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400 text-xs">No image</div>
          )}
        </div>
      ),
    },
    {
      key: "name",
      header: "Name",
      render: (category) => (
        <div className="font-medium text-gray-900">{category.name}</div>
      ),
    },
    {
      key: "slug",
      header: "Slug",
      render: (category) => (
        <code className="px-2 py-1 bg-gray-100 rounded text-sm">
          {category.slug}
        </code>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      render: (category) => {
        const isItemLoading = loadingStates.get(category.id);
        return (
          <button
            onClick={() => handleToggleActive(category)}
            disabled={isItemLoading}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 disabled:opacity-50 ${
              category.isActive ? "bg-[var(--color-primary)]" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                category.isActive ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-16",
      render: (category) => (
        <CategoryTableActions
          category={category}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
          isDeleting={loadingStates.get(category.id)}
        />
      ),
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-hero-text-heading)]">
            Categories
          </h1>
          <p className="text-[var(--color-hero-text-subtitle)] mt-1">
            Manage product categories
          </p>
        </div>
        <Button
          onClick={handleAddCategory}
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        data={categories}
        columns={columns}
        isLoading={isLoading}
        onRefresh={fetchCategories}
        title=""
        emptyMessage="No categories found. Add your first category to get started."
        getItemId={(category) => category.id}
        loadingStates={loadingStates}
      />

      {/* Add/Edit Category Modal */}
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleFormSubmit}
        isLoading={isSubmitting}
        mode={modalMode}
        categoryData={selectedCategory}
      />
    </div>
  );
};

export default CategoryPage;
