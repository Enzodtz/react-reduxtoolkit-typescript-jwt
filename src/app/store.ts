import { configureStore } from "@reduxjs/toolkit";
import authReducer from "features/auth/authSlice";
import cartReducer from "features/cart/cartSlice";
import { load } from "features/auth/authSlice";
import { cartActions } from "features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

// load user
// TODO: Uncomment this
// store.dispatch(load(""));

// For typing of hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
