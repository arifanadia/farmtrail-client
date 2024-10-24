/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsState, Product } from "../../../../types/index";
import { getAllProducts } from "./productsApi";

// Define the initial state using the ProductsState interface
const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[], { 
  page?: number; 
  limit?: number; 
  sort?: string; 
  order?: string; 
  search?: string; 
  priceRange?: string; 
  category?: string 
}>(
  "products/fetchProducts",
  async (params, { rejectWithValue }) => {
    if (params.priceRange) {
      params.priceRange = `${params.priceRange[0]}-${params.priceRange[1]}`; // Convert array to string
    }
    try {
      // Pass params to the getAllProducts function
      const products = await getAllProducts(params); 
        console.log("Fetched products:", products); // <-- Pass parameters here
      return products ;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

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
        state.error = action.error?.message as string;
      });
  },
});


export const { addProduct, removeProduct, updateProduct } =
  productsSlice.actions;


export default productsSlice.reducer;
