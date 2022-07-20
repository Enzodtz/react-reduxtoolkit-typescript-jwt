import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthStateType } from "common/types/auth";
import { CartItemType, CartType } from "common/types/cart";
import { ProductType } from "common/types/product";
import cartService from "./cartService";

// Initial State
const initialState: CartType = cartService.load() || [];

// Slice creation
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state: CartType, action: PayloadAction<ProductType>) => {
      let item = state.find((item) => item.product.id === action.payload.id);
      if (item) {
        item.quantity++;
      } else {
        state.push({
          product: action.payload,
          quantity: 1,
        });
      }
      cartService.save(state);
    },
    remove: (state: CartType, action: PayloadAction<ProductType>) => {
      let item = state.find((item) => item.product.id === action.payload.id);
      if (item) {
        item.quantity--;
        if (item.quantity <= 0) {
          state.splice(state.indexOf(item), 1);
        }
        cartService.save(state);
      }
    },
  },
});

// Exporting stuff
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
