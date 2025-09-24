// components/adminComponents/AddProductModal.tsx
import { GenericFormModal } from "../form/GenericFormModal";
import { ProductNameField } from "../form/ProductNameField";
import { PriceStockField } from "../form/PriceStockField";
import { MultiSelectDropdown } from "../form/MultiSelectDropdown";
import { DynamicFieldArray } from "../form/DynamicFieldArray";
import { ImageUploadField } from "../form/ImageUploadField";
import { useImageUpload } from "../../hooks/useImageUpload";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { productSchema } from "@/validateSchema/addProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import type { z } from "zod";

type FormData = z.infer<typeof productSchema>;

type ProductFormData = FormData & {
  image: File | null;
};

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProductFormData) => void;
}

const AddProductModal = ({ isOpen, onClose, onSave }: AddProductModalProps) => {
  const {
    imageFile,
    imagePreview,
    imageError,
    handleImageChange,
    removeImage,
    resetImage,
    setImageError,
  } = useImageUpload();

  const categories = [
    "Home decor",
    "Indoor",
    "Outdoor",
    "Medicinal",
    "Flowers",
    "Garden Tools",
  ];

  const form = useForm<FormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: "",
      category: [] as string[],
      description: "",
      stock: "",
      careInstructions: [{ value: "" }],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "careInstructions",
  });

  const onSubmit = (data: FormData) => {
    // Validate image
    if (!imageFile) {
      setImageError("Product image is required");
      return;
    }

    // Filter out empty care instructions
    const filteredCareInstructions = data.careInstructions.filter(
      (instruction) => instruction.value.trim() !== ""
    );

    const productData: ProductFormData = {
      ...data,
      careInstructions: filteredCareInstructions,
      image: imageFile,
    };

    onSave(productData);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    reset();
    resetImage();
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <GenericFormModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Product"
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        <ProductNameField register={register} error={errors.name?.message} />

        <PriceStockField
          register={register}
          errors={{
            price: errors.price?.message,
            stock: errors.stock?.message,
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
          append={() => append({ value: "" })} // Fix: Append string, not object
          remove={remove}
          name="careInstructions"
          label="Care Instructions"
          placeholder="Enter care instruction"
          error={errors.careInstructions?.message}
          showBulletPoints
        />

        <ImageUploadField
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          onRemoveImage={removeImage}
          error={imageError}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] text-white"
          >
            {isSubmitting ? "Adding..." : "Add Product"}
          </Button>
        </div>
      </form>
    </GenericFormModal>
  );
};

export default AddProductModal;
