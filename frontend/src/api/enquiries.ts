import { api } from "@/api/api";
import type { CreateEnquiryPayload, Enquiry } from "@/types/enquiry";

export const createEnquiry = async (payload: CreateEnquiryPayload) => {
  const res = await api.post("/api/v1/enquiries", payload);
  return res.data;
};

export const getEnquiriesByOrder = async (orderId: string) => {
  const res = await api.get(`/api/v1/enquiries/${orderId}`);
  return res.data.data; 
};

export const getMyEnquiries = async () => {
  const res = await api.get<Enquiry[]>("/api/v1/enquiries/my-enquiries");
  return res.data;
};
