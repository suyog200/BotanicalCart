import { api } from "@/api/api";

export interface ProductData {
  name: string;
  price: number;
  description: string;
  units?: number;
  isFeatured?: boolean;
  inStock?: boolean;
  categoryIds?: string[];
  careInstructions?: string[];
  image?: File;
}

export const buildProductFormData = (data: ProductData): FormData => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("price", data.price.toString());
  formData.append("description", data.description);
  formData.append("units", data.units?.toString() || "0");
  formData.append("isFeatured", data.isFeatured?.toString() || "false");
  formData.append("inStock", data.inStock?.toString() || "true");

  if (Array.isArray(data.categoryIds) && data.categoryIds.length) {
    data.categoryIds.forEach((id) => {
      if (id) formData.append("categoryIds", id);
    });
  }

  if (Array.isArray(data.careInstructions)) {
    formData.append("careInstructions", JSON.stringify(data.careInstructions));
  }

  if (data.image && data.image instanceof File) {
    formData.append("image", data.image);
  }
  return formData;
};

export const getAllAdminProducts = async (
  page: number = 1,
  limit: number = 5,
  includeHidden: boolean = true,
  search?: string,
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    includeHidden: includeHidden.toString(),
  });

  if (search) {
    params.append("search", search);
  }

  const res = await api.get(`/api/v1/admin/products?${params.toString()}`);
  return res.data;
};

export const getAdminProductById = async (productId: string) => {
  const res = await api.get(`/api/v1/admin/products/${productId}`);
  return res.data;
};

export const createAdminProduct = async (data: ProductData) => {
  const formData = buildProductFormData(data);
  const res = await api.post("/api/v1/admin/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateAdminProduct = async (
  productId: string,
  data: ProductData,
) => {
  const formData = buildProductFormData(data);
  const res = await api.put(`/api/v1/admin/products/${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteAdminProduct = async (productId: string) => {
  const res = await api.delete(`/api/v1/admin/products/${productId}`);
  return res.data;
};

export const toggleProductInStock = async (
  productId: string,
  inStock: boolean,
) => {
  const res = await api.patch(`/api/v1/admin/products/${productId}`, {
    inStock,
  });
  return res.data;
};

export const toggleProductVisibility = async (
  productId: string,
  isHidden: boolean,
) => {
  const res = await api.patch(`/api/v1/admin/products/${productId}`, {
    isHidden,
  });
  return res.data;
};
