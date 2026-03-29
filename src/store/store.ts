import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import settingsReducer from "./settingsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;