/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../../firebase/firebase.config";
import { apiClient } from "@/lib/api-client";

interface User {
  email: string;
  password: string;
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

      // Return the registered user data
      return { email: user.email, username: data.username };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = {
          email: action.payload.email || "",
          username: action.payload.username || "",
          // It's best not to store the password in state
          password: "", // Optional: Remove if you don't want it in the state
        };
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});



export default authSlice.reducer;
