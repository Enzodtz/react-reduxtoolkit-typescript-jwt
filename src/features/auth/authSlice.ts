import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import handleFormError from "common/handle_form_error";
import {
  AuthStateType,
  LoginFormType,
  RegisterFormType,
  UserType,
} from "common/types/auth";
import authService from "./authService";
import constants from "config/constants";
import { setAxiosToken } from "config/axios";
import jwt from "jwt-decode";
import {
  register,
  registerFulfilled,
  registerPending,
  registerRejected,
} from "./register";
import { login, loginFulfilled, loginPending, loginRejected } from "./login";
import { load, loadFulfilled, loadRejected } from "./load";
import { refresh, refreshFullfiled, refreshRejected } from "./refresh";

// Initial State
const initialState: AuthStateType = {
  user: null,
  loading: false,
  fieldErrors: {},
  globalError: "",
};

// Slice creation
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, registerPending)
      .addCase(register.fulfilled, registerFulfilled)
      .addCase(register.rejected, registerRejected)
      .addCase(login.pending, loginPending)
      .addCase(login.fulfilled, loginFulfilled)
      .addCase(login.rejected, loginRejected)
      .addCase(refresh.fulfilled, refreshFullfiled)
      .addCase(refresh.rejected, refreshRejected)
      .addCase(load.fulfilled, loadFulfilled)
      .addCase(load.rejected, loadRejected);
  },
});

// Exporting stuff
export const {} = authSlice.actions;
export default authSlice.reducer;
export { login, register, load, refresh };
