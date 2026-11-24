/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsState } from "../../../../types/index";
import {
  getAllProducts,
  getCategoriesApi,
  getFeaturedProductsApi,
  FetchProductsParams,
} from "./productsApi";

const initialState: ProductsState = {
  products: [],
  totalProducts: 0,
  totalPages: 1,
  currentPage: 1,
  limit: 9,
  loading: false,
  error: null,
  categories: [],
  categoryCounts: {},
  minPrice: 0,
  maxPrice: 50,
  featuredProducts: [],
  searchQuery: "",
  selectedCategory: "All",
  priceRange: [0, 50],
  sort: "createdAt",
  order: "desc",
  inStockOnly: false,
  viewMode: "grid",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params: FetchProductsParams, { rejectWithValue }) => {
    try {
      const cleanParams: FetchProductsParams = { ...params };
      if (cleanParams.priceRange && Array.isArray(cleanParams.priceRange)) {
        cleanParams.priceRange = `${cleanParams.priceRange[0]}-${cleanParams.priceRange[1]}`;
      }
      const data = await getAllProducts(cleanParams);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch products"
      );
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCategoriesApi();
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

export const fetchFeatured = createAsyncThunk(
  "products/fetchFeatured",
  async (limit: number = 4, { rejectWithValue }) => {
    try {
      const data = await getFeaturedProductsApi(limit);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch featured products"
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
      state.currentPage = 1;
    },
    setSortAndOrder: (
      state,
      action: PayloadAction<{ sort: string; order: string }>
    ) => {
      state.sort = action.payload.sort;
      state.order = action.payload.order;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      state.currentPage = 1;
    },
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload;
    },
    setInStockOnly: (state, action: PayloadAction<boolean>) => {
      state.inStockOnly = action.payload;
      state.currentPage = 1;
    },
    resetFilters: (state) => {
      state.searchQuery = "";
      state.selectedCategory = "All";
      state.priceRange = [state.minPrice, state.maxPrice];
      state.sort = "createdAt";
      state.order = "desc";
      state.inStockOnly = false;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        if (Array.isArray(payload)) {
          state.products = payload;
          state.totalProducts = payload.length;
          state.totalPages = 1;
        } else if (payload && Array.isArray(payload.products)) {
          state.products = payload.products;
          state.totalProducts = payload.totalProducts ?? payload.products.length;
          state.totalPages = payload.totalPages ?? 1;
          state.currentPage = payload.currentPage ?? state.currentPage;
        } else {
          state.products = [];
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || "Failed to load products";
      })

      // fetchCategories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        if (action.payload?.success) {
          state.categories = action.payload.categories || [];
          state.categoryCounts = action.payload.categoryCounts || {};
          if (typeof action.payload.minPrice === "number") {
            state.minPrice = Math.floor(action.payload.minPrice);
          }
          if (typeof action.payload.maxPrice === "number") {
            state.maxPrice = Math.ceil(action.payload.maxPrice);
            // If priceRange is still at default [0, 50], adjust max
            if (state.priceRange[0] === 0 && state.priceRange[1] === 50) {
              state.priceRange = [state.minPrice, Math.ceil(action.payload.maxPrice)];
            }
          }
        }
      })

      // fetchFeatured
      .addCase(fetchFeatured.fulfilled, (state, action) => {
        if (action.payload?.success && Array.isArray(action.payload.products)) {
          state.featuredProducts = action.payload.products;
        }
      });
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setPriceRange,
  setSortAndOrder,
  setCurrentPage,
  setLimit,
  setViewMode,
  setInStockOnly,
  resetFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
