import { api } from "@/api/api";

export const getAllAdminOrders = async (
  cursor?: string,
  limit: number = 20,
) => {
  const params = new URLSearchParams({ limit: limit.toString() });
  if (cursor) {
    params.append("cursor", cursor);
  }
  const res = await api.get(`/api/v1/admin/orders?${params.toString()}`);
  console.log("Fetched admin orders:", res.data);
  return res.data;
};

export const getAdminOrderById = async (orderId: string) => {
  const res = await api.get(`/api/v1/admin/orders/${orderId}`);
  return res.data;
};

export const updateAdminOrder = async (
  orderId: string,
  payload: { status?: string; paymentStatus?: string },
) => {
  const res = await api.patch(`/api/v1/admin/orders/${orderId}`, payload);
  return res.data;
};
