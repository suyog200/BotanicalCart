import {api} from "@/api/api";

export const getAllAdminOrders = async () => {
  const res = await api.get("/api/v1/admin/orders");
  return res.data;
};

export const getAdminOrderById = async (orderId: string) => {
  const res = await api.get(`/api/v1/admin/orders/${orderId}`);
  return res.data;
};

export const updateAdminOrder = async (
  orderId: string,
  payload: { status?: string; paymentStatus?: string }
) => {
  const res = await api.patch(
    `/api/v1/admin/orders/${orderId}`,
    payload
  );
  return res.data;
};
