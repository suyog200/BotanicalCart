import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GenericFormModal } from "../form/GenericFormModal";
import { ImageUploadField } from "../form/ImageUploadField";
import { Button } from "@/components/ui/button";
import { useImageUpload } from "../../hooks/useImageUpload";
import {
  categorySchema,
} from "@/validateSchema/categorySchema";
import type {
  CategoryFormData,
} from "@/validateSchema/categorySchema";
import type { Category, CategorySubmitData } from "@/types/categoryTypes";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CategorySubmitData) => void;
  isLoading: boolean;
  mode?: "add" | "edit";
  categoryData?: Category | null;
}

const AddCategoryModal = ({
  isOpen,
  onClose,
  onSave,
  isLoading,
  mode = "add",
  categoryData = null,
}: AddCategoryModalProps) => {
  const [isFormReady, setIsFormReady] = useState(false);

  const {
    imageFile,
    imagePreview,
    imageError,
    handleImageChange,
    removeImage,
    resetImage,
    setImageError,
    setImagePreview,
  } = useImageUpload();

  const defaultValues: CategoryFormData = {
    name: "",
    description: "",
    isActive: true,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues,
    mode: "onChange",
  });

  // Handle form population when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsFormReady(false);

      if (mode === "edit" && categoryData) {
        const editFormData: CategoryFormData = {
          name: categoryData.name || "",
          description: categoryData.description || "",
          isActive: categoryData.isActive,
        };

        reset(editFormData);

        if (categoryData.imageUrl) {
          setImagePreview(categoryData.imageUrl);
        }
      } else {
        reset(defaultValues);
        resetImage();
      }

      setTimeout(() => setIsFormReady(true), 100);
    }
  }, [isOpen, mode, categoryData, reset, resetImage, setImagePreview]);

  const onSubmit = (data: CategoryFormData) => {
    if (mode === "add" && !imageFile) {
      setImageError("Category image is required");
      return;
    }

    const submitData: CategorySubmitData = {
      ...data,
      image: imageFile,
    };

    onSave(submitData);
  };

  const modalTitle = mode === "edit" ? "Edit Category" : "Add New Category";
  const submitButtonText = mode === "edit" ? "Update Category" : "Add Category";
  const loadingText = mode === "edit" ? "Updating..." : "Adding...";

  if (!isOpen || !isFormReady) {
    return isOpen ? (
      <GenericFormModal
        isOpen={isOpen}
        onClose={onClose}
        title={modalTitle}
        size="md"
      >
        <div className="p-6 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
          <span className="ml-2">Loading...</span>
        </div>
      </GenericFormModal>
    ) : null;
  }

  return (
    <GenericFormModal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
        {/* Category Name */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-hero-text-heading)] mb-2">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("name")}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter category name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-hero-text-heading)] mb-2">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter category description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Active Status */}
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("isActive")}
            id="isActive"
            className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-gray-300 rounded"
          />
          <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
            Active Category
          </label>
        </div>

        {/* Image Upload */}
        <ImageUploadField
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          onRemoveImage={removeImage}
          error={imageError}
          label="Category Image"
          required={mode === "add"}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] text-white"
          >
            {isLoading ? loadingText : submitButtonText}
          </Button>
        </div>
      </form>
    </GenericFormModal>
  );
};

export default AddCategoryModal;
