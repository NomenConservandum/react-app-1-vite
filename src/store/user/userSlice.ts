import { createSlice } from "@reduxjs/toolkit";
import { login, checkAuth } from "./thunks";
import type { PayloadAction } from "@reduxjs/toolkit"; 
import type { User } from "../../types/api";

interface UserState {
  user: User | null;
  isAuth: boolean;
  token: string | null;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAuth: false,
    token: localStorage.getItem('token'),
  } as UserState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      state.token = null;
      localStorage.removeItem('token');
    },
    setUser: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.accessToken;
            state.isAuth = true;
            // Важно сохранять токен, чтобы после перезагрузки страницы он подтянулся в initialState
            localStorage.setItem('token', action.payload.accessToken);
        },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuth = false;
        state.user = null;
      });
  }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;