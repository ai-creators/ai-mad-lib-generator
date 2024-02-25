import { ErrorModel } from "@/models/ErrorModel";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ErrorState {
  globalError: ErrorModel | null;
}

const initialState: ErrorState = {
  globalError: null,
};

export const globalErrorSlice = createSlice({
  name: "globalError",
  initialState,
  reducers: {
    setGlobalError: (state, action: PayloadAction<ErrorModel | null>) => {
      state.globalError = action.payload;
    },
    voidGlobalError: (state) => {
      state.globalError = null;
    },
  },
});

export const { setGlobalError, voidGlobalError } = globalErrorSlice.actions;
export default globalErrorSlice.reducer;
