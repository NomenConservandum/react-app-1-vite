import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/api";

interface UserState {
  user: User | null;
  isAuth: boolean;
  accessToken: string | null;
}

// Безопасное получение начального токена
const getInitialToken = (): string | null => {
  const data = localStorage.getItem('token');
  if (!data) return null;
  try {
    return JSON.parse(data).accessToken;
  } catch {
    return null;
  }
};

const initialState: UserState = {
  user: null,
  isAuth: !!getInitialToken(),
  accessToken: getInitialToken(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Вызывается после успешного логина или рефреша (если нужно вручную)
    setUser: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      state.accessToken = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    // Здесь можно добавить обработку thunks (login.fulfilled и т.д.)
    // Не забывайте сохранять объект в localStorage в самих thunks или сервисе!
  }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;