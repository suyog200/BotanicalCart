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

export const getOrders = async (cursor?: string, limit: number = 10) => {
  const params = new URLSearchParams({ limit: limit.toString() });
  if (cursor) {
    params.append("cursor", cursor);
  }
  const res = await api.get(`/api/v1/orders/my-orders?${params.toString()}`);
  return res.data;
};

export const cancelOrder = async (orderId: string) => {
  const res = await api.patch(`/api/v1/orders/${orderId}/cancel`);
  return res.data;
};
