import { api } from "@/api/api";

interface CreateOrderPayload {
  items: { productId: string; quantity: number }[];
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export const createOrder = async (payload: CreateOrderPayload) => {
  const res = await api.post("/api/v1/orders", payload);
  return res.data;
};

export const getOrders = async () => {
  const res = await api.get("/api/v1/orders/my");
  return res.data;
}
