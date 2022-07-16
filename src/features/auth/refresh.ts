import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthStateType, UserType } from "common/types/auth.types";
import authService from "./authService";
import jwt from "jwt-decode";
import { setAxiosToken } from "config/axios";

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (user: UserType, thunkAPI) => {
    return await authService
      .refresh(user.refresh)
      .then((response: any) => {
        const newUser = structuredClone(user);
        const decodedAccess: any = jwt(response.data.access);
        newUser.access = response.data.access;
        newUser.accessExp = decodedAccess.exp;

        setAxiosToken(newUser.access);
        authService.save(newUser);

        setTimeout(
          () => thunkAPI.dispatch(refresh(newUser)),
          // @ts-ignore
          new Date(newUser.accessExp * 1000) - new Date()
        );
        return newUser;
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue("");
      });
  }
);

export function refreshRejected(state: AuthStateType, action: any) {
  // Todo: Add login expired error msg
  state.user = null;
}

export function refreshFullfiled(state: AuthStateType, action: any) {
  // @ts-ignore
  state.user = action.payload;
}
