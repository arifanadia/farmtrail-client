/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState, Product } from "@/types";

const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("farmtrail_cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("farmtrail_cart", JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save cart to storage", e);
  }
};

const calculateTotals = (items: CartItem[]) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return { totalQuantity, totalAmount: parseFloat(totalAmount.toFixed(2)) };
};

const initialItems = loadCartFromStorage();
const initialTotals = calculateTotals(initialItems);

const initialState: CartState = {
  items: initialItems,
  totalQuantity: initialTotals.totalQuantity,
  totalAmount: initialTotals.totalAmount,
};

const extractFirstImage = (images: string | string[] | undefined): string => {
  if (Array.isArray(images) && images.length > 0) return images[0];
  if (typeof images === "string" && images.trim()) return images;
  return "/placeholder.jpg";
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity?: number;
        variant?: string;
        price?: number;
      }>
    ) => {
      const { product, quantity = 1, variant = "", price } = action.payload;
      const effectivePrice =
        price !== undefined ? price : product.offerPrice || product.mainPrice || 0;
      const itemId = `${product._id || product.productId}_${variant}`;

      const existingIndex = state.items.findIndex(
        (item) => `${item._id}_${item.selectedVariant || ""}` === itemId
      );

      if (existingIndex > -1) {
        state.items[existingIndex].quantity += quantity;
      } else {
        state.items.push({
          _id: product._id || product.productId,
          productId: product.productId || product._id,
          productName: product.productName,
          price: effectivePrice,
          mainPrice: product.mainPrice,
          image: extractFirstImage(product.images),
          quantity,
          selectedVariant: variant,
          variant: variant,
        });
      }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
      saveCartToStorage(state.items);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; variant?: string; quantity: number }>
    ) => {
      const { id, variant = "", quantity } = action.payload;
      const itemId = `${id}_${variant}`;

      const item = state.items.find(
        (it) => `${it._id}_${it.selectedVariant || ""}` === itemId
      );

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (it) => `${it._id}_${it.selectedVariant || ""}` !== itemId
          );
        } else {
          item.quantity = quantity;
        }
      }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
      saveCartToStorage(state.items);
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ id: string; variant?: string }>
    ) => {
      const { id, variant = "" } = action.payload;
      const itemId = `${id}_${variant}`;
      state.items = state.items.filter(
        (item) => `${item._id}_${item.selectedVariant || ""}` !== itemId
      );

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      saveCartToStorage([]);
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
