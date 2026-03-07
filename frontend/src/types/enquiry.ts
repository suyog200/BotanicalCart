export interface EnquiryFormData {
  subject: string;
  description: string;
}

export interface CreateEnquiryPayload {
  orderId: string;
  subject: string;
  message: string;
}

export interface Enquiry {
  id: string;
  orderId: string;
  subject: string;
  description: string;
  status: "pending" | "in-progress" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
  userId?: string;
}
