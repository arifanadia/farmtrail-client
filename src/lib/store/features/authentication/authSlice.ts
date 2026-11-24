import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  getAuth,
} from "firebase/auth";
import app from "../../../firebase/firebase.config";
import { apiClient } from "@/lib/api-client";

interface User {
  email: string;
  username: string;
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

function getAuthErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const serverMessage = (
      error.response?.data as { message?: string } | undefined
    )?.message;
    return serverMessage || error.message || fallback;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}

// Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data: { email: string; password: string; username?: string }, { rejectWithValue }) => {
    try {
      const createUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = createUser.user;

      if (data.username) {
        await updateProfile(user, { displayName: data.username });
      }

      const newUser = {
        email: user.email,
        username: data.username,
      };

      await apiClient.post("/signup", newUser);

      return { email: user.email, username: data.username };
    } catch (error: unknown) {
      return rejectWithValue(getAuthErrorMessage(error, "Registration failed."));
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      return { email: user.email, username: user.displayName || "" }; 
    } catch (error: unknown) {
      return rejectWithValue(getAuthErrorMessage(error, "Login failed."));
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; 
    },
  
    clearUser: (state) => {
      state.user = null; 
    },
  },
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

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
