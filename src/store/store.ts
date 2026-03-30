import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
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