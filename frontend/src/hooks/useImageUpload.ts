import { useCallback, useState } from "react";

// hooks/useImageUpload.ts
export const useImageUpload = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string>("");

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setImageError("Please select a valid image file (JPG, JPEG, PNG)");
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setImageError("File size must be less than 5MB");
        return;
      }

      setImageFile(file);
      setImageError("");

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const removeImage = useCallback(() => {
    setImageFile(null);
    setImagePreview(null);
    setImageError("");
  }, []);

  const resetImage = useCallback(() => {
    setImageFile(null);
    setImagePreview(null);
    setImageError("");
  }, []);

  return {
    imageFile,
    imagePreview,
    imageError,
    setImageError,
    handleImageChange,
    removeImage,
    resetImage
  };
};