import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import handleFormError from "common/handle_form_error";
import {
  AuthStateType,
  RegisterFormType,
  UserType,
} from "common/types/auth.types";
import authService from "./authService";
import { refresh } from "./refresh";
import jwt from "jwt-decode";
import { setAxiosToken } from "config/axios";

export const register = createAsyncThunk(
  "auth/register",
  async (user: RegisterFormType, thunkAPI) => {
    return await authService
      .register(user)
      .then((response) => {
        let newUser = response.data;

        const decodedAccess: any = jwt(response.data.access);
        const decodedRefresh: any = jwt(response.data.refresh);
        newUser.accessExp = decodedAccess.exp;
        newUser.refreshExp = decodedRefresh.exp;

        setAxiosToken(newUser.access);
        authService.save(response.data);

        setTimeout(
          () => thunkAPI.dispatch(refresh(newUser)),
          // @ts-ignore
          new Date(newUser.accessExp * 1000) - new Date()
        );
        return newUser;
      })
      .catch((error: any) => {
        return thunkAPI.rejectWithValue(handleFormError(error));
      });
  }
);

export function registerPending(state: AuthStateType) {
  state.loading = true;
  state.fieldErrors = {};
  state.globalError = "";
}

export function registerFulfilled(state: AuthStateType, action: PayloadAction) {
  state.loading = false;
  state.fieldErrors = {};
  state.globalError = "";
  // @ts-ignore
  state.user = action.payload;
}

export function registerRejected(state: AuthStateType, action: any) {
  state.loading = false;
  if (typeof action.payload == "object") {
    // @ts-ignore
    state.fieldErrors = action.payload;
    state.globalError = "";
  } else {
    // @ts-ignore
    state.globalError = action.payload;
    state.fieldErrors = {};
  }
  state.user = null;
}
