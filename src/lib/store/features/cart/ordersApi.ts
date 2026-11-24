import { apiClient } from "@/lib/api-client";

export interface OrderPayload {
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country?: string;
    notes?: string;
  };
  items: Array<{
    productId: string;
    productName: string;
    image?: string;
    price: number;
    quantity: number;
    variant?: string;
  }>;
  paymentMethod: "visa" | "mastercard" | "cash_on_delivery";
  cardDetails?: {
    cardNumber: string;
    cardholderName: string;
    expiry: string;
    cvv: string;
  };
  couponCode?: string;
}

export const placeOrderApi = async (payload: OrderPayload) => {
  const response = await apiClient.post(`/orders`, payload);
  return response.data;
};

export const getOrderByIdApi = async (orderId: string) => {
  const response = await apiClient.get(`/orders/${orderId}`);
  return response.data;
};

export const getUserOrdersApi = async (email: string) => {
  const response = await apiClient.get(`/orders/user/${encodeURIComponent(email)}`);
  return response.data;
};
