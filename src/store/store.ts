// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import settingsReducer from './settingsSlice';
import quotesReducer from './quotesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingsReducer,
    quotes: quotesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;