import { Upload, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

// components/form/ImageUploadField.tsx
interface ImageUploadFieldProps {
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  error?: string;
  label?: string;
  required?: boolean;
}

export const ImageUploadField = ({
  imagePreview,
  onImageChange,
  onRemoveImage,
  error,
  label = "Product Image",
  required = true
}: ImageUploadFieldProps) => (
  <div>
    <label className="block text-sm font-medium text-[var(--color-hero-text-heading)] mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>

    {!imagePreview ? (
      <div className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors ${
        error ? "border-red-500" : "border-gray-300"
      }`}>
        <input
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">Click to upload {label.toLowerCase()}</p>
          <p className="text-sm text-gray-400">PNG, JPG, JPEG up to 5MB</p>
        </label>
      </div>
    ) : (
      <Card className="relative">
        <CardContent className="p-4">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={onRemoveImage}
              className="absolute top-2 right-2 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);