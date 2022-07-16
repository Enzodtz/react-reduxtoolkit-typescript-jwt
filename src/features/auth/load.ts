import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthStateType } from "common/types/auth.types";
import { setAxiosToken } from "config/axios";
import authService from "./authService";
import { refresh } from "./refresh";

export const load = createAsyncThunk("auth/load", async (_: any, thunkAPI) => {
  try {
    const user = await authService.load();

    if (!user) {
      return thunkAPI.rejectWithValue("");
    }

    setAxiosToken(user.access);

    const validRefresh = await authService.verify(user.refresh);
    const validAccess = await authService.verify(user.access);

    if (!validAccess && !validRefresh) {
      return thunkAPI.rejectWithValue("");
    }
    if (validAccess && validRefresh) {
      setTimeout(
        () => thunkAPI.dispatch(refresh(user)),
        // @ts-ignore
        new Date(user.accessExp * 1000) - new Date()
      );
    }
    if (!validAccess && validRefresh) {
      thunkAPI.dispatch(refresh(user));
    }

    return user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue("");
  }
});

export function loadFulfilled(state: AuthStateType, action: PayloadAction) {
  // @ts-ignore
  state.user = action.payload;
}

export function loadRejected(state: AuthStateType, action: any) {
  // Todo: Add login expired error msg
  state.user = null;
}
