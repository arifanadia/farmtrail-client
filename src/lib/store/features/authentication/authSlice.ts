/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
import app from "../../../firebase/firebase.config";
import { apiClient } from "@/lib/api-client";

interface User {
  email: string;
  password: string;
  username?: string; // Optional for login
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const auth = getAuth(app);

// Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data: User, { rejectWithValue }) => {
    try {
      const createUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = createUser.user;

      const newUser = {
        email: user.email,
        username: data.username,
      };

      await apiClient.post("/signup", newUser);

      return { email: user.email, username: data.username };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: User, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      return { email: user.email, username: user.displayName || "" }; 
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  const auth = getAuth(app);
  await signOut(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Register User
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = {
          email: action.payload.email || "",
          username: action.payload.username || "",
          password: "", // It's best not to store the password in state
        };
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = {
          email: action.payload.email || "",
          username: action.payload.username || "",
          password: "", // Optional: Remove if you don't want it in the state
        };
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Logout User
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
