import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import handleFormError from "common/handle_form_error";
import { AuthStateType, LoginFormType, UserType } from "common/types/auth";
import authService from "./authService";
import { refresh } from "./refresh";
import jwt from "jwt-decode";
import { setAxiosToken } from "config/axios";

export const login = createAsyncThunk(
  "auth/login",
  async (user: LoginFormType, thunkAPI) => {
    return await authService
      .login(user)
      .then((response) => {
        let newUser = response.data;

        const decodedAccess: any = jwt(response.data.access);
        const decodedRefresh: any = jwt(response.data.refresh);
        response.data.accessExp = decodedAccess.exp;
        response.data.refreshExp = decodedRefresh.exp;

        setAxiosToken(response.data.access);
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

export function loginPending(state: AuthStateType) {
  state.loading = true;
  state.fieldErrors = {};
  state.globalError = "";
}

export function loginFulfilled(state: AuthStateType, action: PayloadAction) {
  state.loading = false;
  state.fieldErrors = {};
  state.globalError = "";
  // @ts-ignore
  state.user = action.payload;
}

export function loginRejected(state: AuthStateType, action: any) {
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
