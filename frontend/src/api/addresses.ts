import { api } from "./api";

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface CreateAddressPayload {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface UpdateAddressPayload extends Partial<CreateAddressPayload> {}

// Fetch all saved addresses
export const fetchAddresses = async (): Promise<Address[]> => {
  const response = await api.get<{ data: Address[]; success: boolean }>(
    "/api/v1/addresses",
  );
  return response.data.data;
};

// Create a new address
export const createAddress = async (
  payload: CreateAddressPayload,
): Promise<Address> => {
  const response = await api.post<{ data: Address; success: boolean }>(
    "/api/v1/addresses",
    payload,
  );
  return response.data.data;
};

// Update an existing address
export const updateAddress = async (
  id: string,
  payload: UpdateAddressPayload,
): Promise<Address> => {
  const response = await api.put<{ data: Address; success: boolean }>(
    `/api/v1/addresses/${id}`,
    payload,
  );
  return response.data.data;
};

// Delete an address
export const deleteAddress = async (id: string): Promise<void> => {
  await api.delete(`/api/v1/addresses/${id}`);
};
