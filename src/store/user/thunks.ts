import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import type { User, RegisterUserData } from "../../types/api";

export const login = createAsyncThunk(
  "user/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/Auth/Login", data);
      
      const token = response.data;
      localStorage.setItem('token', JSON.stringify(response.data));

      return {
        user: response.data.user || null,
        accessToken: token,
      };
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.title || "Login error");
    }
  }
);

export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/User/myprofile");
      return response.data as User;
    } catch (e: any) {
      localStorage.removeItem("token");
      return rejectWithValue("Session expired");
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (data: RegisterUserData, { rejectWithValue }) => {
    try {
      await api.post("/api/Auth/Registration", data);
      return; 
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.title || "Registration error");
    }
  }
);