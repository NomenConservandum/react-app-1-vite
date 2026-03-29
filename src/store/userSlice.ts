// src/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/api';

interface UserState {
  user: User | null;
  isAuth: boolean;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;