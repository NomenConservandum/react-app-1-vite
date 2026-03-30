import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/api";

interface UserState {
  user: User | null;
  isAuth: boolean;
  accessToken: string | null;
}

// Функция для извлечения токена при загрузке страницы
const getInitialToken = (): string | null => {
  const data = localStorage.getItem('token');
  if (!data) return null;
  try {
    const parsed = JSON.parse(data);
    return parsed.accessToken || null;
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
  name: 'user',
  initialState,
  reducers: {
    // Этот экшен для логина (когда есть и юзер, и токен)
    setAuth: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuth = true;
    },
    // Этот экшен ТОЛЬКО для обновления данных профиля
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuth = false;
    }
  }
});

export const { setAuth, setUser, logout } = userSlice.actions;
export default userSlice.reducer;