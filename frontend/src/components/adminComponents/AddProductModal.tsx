import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, X, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Modal from "./Modal";
import { productSchema } from "@/validateSchema/addProductSchema";

type FormData = z.infer<typeof productSchema>;

type ProductFormData = FormData & {
  image: File | null;
};

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: ProductFormData) => void;
}

const AddProductModal = ({ isOpen, onClose, onSave }: AddProductModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string>("");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

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
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    watch,
  } = form;

   watch("category");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setImageError("Please select a valid image file (JPG, JPEG, PNG)");
        return;
      }

      // Validate file size (5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setImageError("File size must be less than 5MB");
        return;
      }

      setImageFile(file);
      setImageError("");

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageError("");
  };

  const onSubmit = (data: FormData) => {
    // Validate image
    if (!imageFile) {
      setImageError("Product image is required");
      return;
    }

    const productData: ProductFormData = {
      ...data,
      image: imageFile,
    };

    onSave(productData);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    reset();
    setImageFile(null);
    setImagePreview(null);
    setImageError("");
    setIsCategoryDropdownOpen(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Product"
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-hero-text-heading)] mb-2">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            type="text"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Price and Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-hero-text-heading)] mb-2">
              Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              {...register("price")}
              type="number"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-hero-text-heading)] mb-2">
              Stock Quantity <span className="text-red-500">*</span>
            </label>
            <input
              {...register("stock")}
              type="number"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
                errors.stock ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="0"
              min="0"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">
                {errors.stock.message}
              </p>
            )}
          </div>
        </div>

        {/* Multi-Select Category */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-hero-text-heading)] mb-2">
            Categories <span className="text-red-500">*</span>
          </label>

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <div className="relative">
                {/* Selected Categories Display */}
                <div
                  className={`min-h-[42px] px-3 py-2 border rounded-lg cursor-pointer flex items-center justify-between ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                  onClick={() =>
                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                  }
                >
                  <div className="flex-1">
                    {field.value && field.value.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {field.value.map((category, index) => (
                          <Badge
                            key={category}
                            variant="secondary"
                            className="bg-[var(--color-primary)] text-white text-xs"
                          >
                            {category}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const newCategories = field.value.filter(
                                  (_, i) => i !== index
                                );
                                field.onChange(newCategories);
                              }}
                              className="ml-1 hover:bg-red-500 rounded-full p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">Select categories</span>
                    )}
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform ${
                      isCategoryDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Dropdown Menu */}
                {isCategoryDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {categories.map((category) => {
                      const isSelected = field.value?.includes(category);
                      return (
                        <div
                          key={category}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-50 flex items-center justify-between"
                          onClick={() => {
                            const currentCategories = field.value || [];
                            if (isSelected) {
                              // Remove category
                              const newCategories = currentCategories.filter(
                                (c) => c !== category
                              );
                              field.onChange(newCategories);
                            } else {
                              // Add category
                              field.onChange([...currentCategories, category]);
                            }
                          }}
                        >
                          <span
                            className={
                              isSelected
                                ? "text-[var(--color-primary)] font-medium"
                                : "text-gray-700"
                            }
                          >
                            {category}
                          </span>
                          {isSelected && (
                            <Check className="h-4 w-4 text-[var(--color-primary)]" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Description */}
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

        {/* Care Instructions */}

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-hero-text-heading)] mb-2">
            Product Image <span className="text-red-500">*</span>
          </label>

          {!imagePreview ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors ${
                imageError ? "border-red-500" : "border-gray-300"
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">
                  Click to upload product image
                </p>
                <p className="text-sm text-gray-400">
                  PNG, JPG, JPEG up to 5MB
                </p>
              </label>
            </div>
          ) : (
            <Card className="relative">
              <CardContent className="p-4">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={removeImage}
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          {imageError && (
            <p className="text-red-500 text-sm mt-1">{imageError}</p>
          )}
        </div>

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
    </Modal>
  );
};

export default AddProductModal;
