export type EnquiryStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "CLOSED";

export interface Enquiry {
  id: string;
  subject: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;

  user: {
    firstName: string;
    lastName: string;
    email: string;
  };

  order: {
    id: string;
    status: string;
    paymentStatus: string;
  };
}
