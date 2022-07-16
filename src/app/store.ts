import { configureStore } from "@reduxjs/toolkit";
import authReducer from "features/auth/authSlice";
import { load } from "features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// load user
store.dispatch(load(""));

// For typing of hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
