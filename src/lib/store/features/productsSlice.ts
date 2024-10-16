import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../api-client";
import { ProductsState, Product } from "../../../types/index";

// Define the initial state using the ProductsState interface
const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

// Define an async action to fetch products using Axios
export const fetchProducts = createAsyncThunk<Product[], void>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/products"); 
      return response.data as Product[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// Create the products slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the action creators
export const { addProduct, removeProduct, updateProduct } =
  productsSlice.actions;

// Export the reducer
export default productsSlice.reducer;
