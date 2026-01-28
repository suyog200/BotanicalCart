export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  paymentMethod?: string;
  paymentStatus?: string;
}