export interface GramPrice {
  _id?: string;
  weight: string;
  price: number;
}

export interface SizePrice {
  size: string;
  price: number;
  offerPrice?: number;
}

export interface ProductReview {
  _id?: string;
  username: string;
  rating: number;
  comment?: string;
}

export interface Product {
  _id: string;
  id?: string | number;
  productId: string;
  sku: string;
  productName: string;
  mainPrice?: number;
  offerPrice: number;
  overview?: string;
  aboutProduct?: string;
  description?: string | Record<string, unknown> | Array<unknown>;
  category: string;
  images: string[];
  gramToPrice?: GramPrice[];
  priceBySize?: SizePrice[];
  reviews?: ProductReview[];
  tags?: string[];
  packageVariety?: string[];
  quantity?: number;
  additionalInfo?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsState {
  products: Product[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  loading: boolean;
  error: string | null;
  categories: string[];
  categoryCounts: Record<string, number>;
  minPrice: number;
  maxPrice: number;
  featuredProducts: Product[];
  // Active Filter state
  searchQuery: string;
  selectedCategory: string;
  priceRange: [number, number];
  sort: string;
  order: string;
  inStockOnly: boolean;
  viewMode: "grid" | "list";
}

export interface CartItem {
  productId: string;
  _id: string;
  productName: string;
  price: number;
  mainPrice?: number;
  image: string;
  quantity: number;
  selectedVariant?: string;
  variant?: string;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
}

export interface OrderShippingAddress {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country?: string;
  notes?: string;
}

export interface OrderPaymentDetails {
  cardholderName?: string;
  last4?: string;
  cardBrand?: string;
  transactionId?: string;
}

export interface Order {
  _id?: string;
  orderId: string;
  customer: OrderCustomer;
  shippingAddress: OrderShippingAddress;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  tax: number;
  discount: number;
  totalAmount: number;
  paymentMethod: "visa" | "mastercard" | "cash_on_delivery";
  paymentStatus: "paid" | "pending" | "failed";
  orderStatus: "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentDetails?: OrderPaymentDetails;
  createdAt?: string;
  updatedAt?: string;
}
