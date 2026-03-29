import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api"; // ваш axios инстанс
import { User } from "../../entities/user/types";

export const login = createAsyncThunk(
  "user/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Путь из вашего swagger: /api/Auth/Login
      const response = await api.post("/api/Auth/Login", data);
      
      const token = response.data.token || response.data.accessToken;
      localStorage.setItem("token", token);

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