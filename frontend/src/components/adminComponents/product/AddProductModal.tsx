import { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GenericFormModal } from "../../form/GenericFormModal";
import { ProductNameField } from "../../form/ProductNameField";
import { PriceStockField } from "../../form/PriceStockField";
import { DynamicFieldArray } from "../../form/DynamicFieldArray";
import { ImageUploadField } from "../../form/ImageUploadField";
import CheckboxGroupField from "../CheckboxGroupField";
import { useImageUpload } from "../../../hooks/useImageUpload";
import { productSchema } from "@/validateSchema/addProductSchema";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/types";
import { api } from "@/api/api";

type FormData = z.infer<typeof productSchema>;

type ProductFormData = Omit<FormData, "careInstructions"> & {
  careInstructions: string[]; // flattened before sending
  image: File | null;
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
  const [categories, setCategories] = useState<
    { id: string; name: string; isActive: boolean }[]
  >([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

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
    categoryIds: [] as string[], // will contain category IDs
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

  // fetch categories for dropdown (include inactive for edit mode)
  useEffect(() => {
    let mounted = true;
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const endpoint =
          mode === "edit"
            ? "/api/v1/categories?limit=200"
            : "/api/v1/categories?activeOnly=true&limit=200";
        const res = await api.get(endpoint);
        const data = res.data?.data ?? [];
        if (!mounted) return;
        setCategories(
          data.map((c: any) => ({
            id: c.id,
            name: c.isActive === false ? `${c.name} (inactive)` : c.name,
            isActive: c.isActive ?? true,
          })),
        );
      } catch (err) {
        console.error("Failed to fetch categories", err);
        setCategoriesError("Failed to load categories");
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
    return () => {
      mounted = false;
    };
  }, [mode]);

  // populate form when modal opens (edit mode)
  useEffect(() => {
    if (isOpen) {
      setIsFormReady(false);

      if (mode === "edit" && productData) {
        const editFormData = {
          name: productData.name || "",
          price: productData.price?.toString() || "",
          categoryIds: productData.categoryIds || [],
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

        // set image preview if product has imageUrl
        if (productData.imageUrl) {
          setImagePreview(productData.imageUrl);
        }
      } else {
        // add mode: reset
        reset(defaultValues);
        resetImage();
      }

      setTimeout(() => setIsFormReady(true), 100);
    }
  }, [isOpen, mode, productData, reset, resetImage, setImagePreview]);

  const onSubmit = (data: FormData) => {
    // validate image for add mode
    if (mode === "add" && !imageFile) {
      setImageError("Product image is required");
      return;
    }

    const filteredCareInstructions = data.careInstructions
      .map((item: any) => item.value.trim())
      .filter((v: string) => v !== "");

    const productFormData: ProductFormData = {
      ...data,
      careInstructions: filteredCareInstructions,
      // @ts-ignore
      image: imageFile,
    };
    onSave(productFormData);
  };

  const modalTitle = mode === "edit" ? "Edit Product" : "Add New Product";
  const submitButtonText = mode === "edit" ? "Update Product" : "Add Product";
  const loadingText = mode === "edit" ? "Updating..." : "Adding...";

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

        {/* --- Category multi select (IDs) --- */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-hero-text-heading)] mb-2">
            Categories <span className="text-red-500">*</span>
          </label>
          <Controller
            name="categoryIds"
            control={control}
            render={({ field }) => {
              // field.value should be an array of selected IDs
              const selectedIds: string[] = Array.isArray(field.value)
                ? field.value
                : [];

              const toggle = (id: string) => {
                if (selectedIds.includes(id)) {
                  field.onChange(selectedIds.filter((x) => x !== id));
                } else {
                  field.onChange([...selectedIds, id]);
                }
              };

              return (
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categoriesLoading && (
                      <div className="text-sm text-gray-500">
                        Loading categories...
                      </div>
                    )}
                    {categoriesError && (
                      <div className="text-sm text-red-500">
                        {categoriesError}
                      </div>
                    )}
                    {!categoriesLoading && categories.length === 0 && (
                      <div className="text-sm text-gray-500">No categories</div>
                    )}
                    {categories.map((c) => {
                      const checked = selectedIds.includes(c.id);
                      return (
                        <label
                          key={c.id}
                          className={`flex items-center gap-2 px-3 py-2 cursor-pointer select-none ${
                            checked
                              ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                              : "bg-white"
                          }`}
                          onClick={(e) => {
                            // Prevent label click from focusing other inputs weirdly
                            e.preventDefault();
                            toggle(c.id);
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggle(c.id)}
                            className="w-4 h-4"
                            aria-label={`Category ${c.name}`}
                          />
                          <span className="text-sm">{c.name}</span>
                        </label>
                      );
                    })}
                  </div>

                  {errors.categoryIds && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.categoryIds.message as string}
                    </p>
                  )}
                </div>
              );
            }}
          />
        </div>

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
          append={() => append({ value: "" })}
          remove={remove}
          name="careInstructions"
          label="Care Instructions"
          placeholder="Enter care instruction"
          error={errors.careInstructions?.message as string}
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
