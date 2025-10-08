// components/adminComponents/AddProductModal.tsx
import { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GenericFormModal } from "../form/GenericFormModal";
import { ProductNameField } from "../form/ProductNameField";
import { PriceStockField } from "../form/PriceStockField";
import { MultiSelectDropdown } from "../form/MultiSelectDropdown";
import { DynamicFieldArray } from "../form/DynamicFieldArray";
import { ImageUploadField } from "../form/ImageUploadField";
import CheckboxGroupField from "./CheckboxGroupField";
import { useImageUpload } from "../../hooks/useImageUpload";
import { productSchema } from "@/validateSchema/addProductSchema";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/types";

type FormData = z.infer<typeof productSchema>;

// Fix: Make image optional for edit mode
type ProductFormData = Omit<FormData, "careInstructions"> & {
  careInstructions: string[]; // flatten before sending
  image: File | null; // Allow null for edit mode when no new image is selected
};

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProductFormData) => void;
  isLoading: boolean;
  mode?: "add" | "edit";
  productData?: Product | null;
}

const AddProductModal = ({
  isOpen,
  onClose,
  onSave,
  isLoading,
  mode = "add",
  productData = null,
}: AddProductModalProps) => {
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

  const categories = [
    "Home decor",
    "Indoor",
    "Outdoor",
    "Medicinal",
    "Flowers",
    "Garden Tools",
  ];

  const checkboxOptions = [
    {
      name: "isFeatured",
      label: "Featured Product",
      description:
        "Mark this product as featured to highlight it on the homepage",
    },
    {
      name: "inStock",
      label: "In Stock",
      description: "Check if this product is currently available for purchase",
    },
  ];

  const defaultValues = {
    name: "",
    price: "",
    category: [] as string[],
    description: "",
    units: "",
    careInstructions: [{ value: "" }],
    isFeatured: false,
    inStock: true,
  };

  const form = useForm<FormData>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "careInstructions",
  });

  // Handle form population when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsFormReady(false);

      if (mode === "edit" && productData) {
        console.log("Populating form with data:", productData);

        // Reset with populated data
        const editFormData = {
          name: productData.name || "",
          price: productData.price?.toString() || "",
          category: productData.category || [],
          description: productData.description || "",
          units: productData.units?.toString() || "",
          careInstructions:
            productData.careInstructions?.length > 0
              ? productData.careInstructions.map((instruction) => ({
                  value: instruction,
                }))
              : [{ value: "" }],
          isFeatured: productData.isFeatured || false,
          inStock:
            productData.inStock !== undefined ? productData.inStock : true,
        };

        reset(editFormData);

        // Set image preview if exists
        if (productData.imageUrl) {
          setImagePreview(productData.imageUrl);
        }
      } else {
        // Reset to default for add mode
        reset(defaultValues);
        resetImage();
      }

      // Mark form as ready after a short delay
      setTimeout(() => {
        setIsFormReady(true);
      }, 100);
    }
  }, [isOpen, mode, productData, reset, resetImage, setImagePreview]);

  const onSubmit = (data: FormData) => {
    // Validate image
    if (mode === "add" && !imageFile) {
      setImageError("Product image is required");
      return;
    }

    const filteredCareInstructions = data.careInstructions
      .map((item) => item.value.trim())
      .filter((value) => value !== "");

    const productFormData: ProductFormData = {
      ...data,
      careInstructions: filteredCareInstructions,
      image: imageFile,
    };

    onSave(productFormData);
  };

  const modalTitle = mode === "edit" ? "Edit Product" : "Add New Product";
  const submitButtonText = mode === "edit" ? "Update Product" : "Add Product";
  const loadingText = mode === "edit" ? "Updating..." : "Adding...";

  // Don't render content until form is ready
  if (!isOpen || !isFormReady) {
    return isOpen ? (
      <GenericFormModal
        isOpen={isOpen}
        onClose={onClose}
        title={modalTitle}
        size="lg"
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
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        <ProductNameField register={register} error={errors.name?.message} />

        <PriceStockField
          register={register}
          errors={{
            price: errors.price?.message,
            units: errors.units?.message,
          }}
        />

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <MultiSelectDropdown
              value={field.value}
              onChange={field.onChange}
              options={categories}
              placeholder="Select categories"
              label="Categories"
              error={errors.category?.message}
            />
          )}
        />

        <div>
          <label className="block text-sm font-medium text-[var(--color-hero-text-heading)] mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("description")}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter product description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <DynamicFieldArray
          fields={fields}
          register={register}
          append={() => append({ value: "" })} // Append object with value property
          remove={remove}
          name="careInstructions"
          label="Care Instructions"
          placeholder="Enter care instruction"
          error={errors.careInstructions?.message}
          showBulletPoints
        />

        <CheckboxGroupField
          options={checkboxOptions}
          register={register}
          errors={{
            isFeatured: errors.isFeatured?.message ?? "",
            inStock: errors.inStock?.message ?? "",
          }}
          title="Product Settings"
        />

        <ImageUploadField
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          onRemoveImage={removeImage}
          error={imageError}
          label="Product Image"
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

export default AddProductModal;
