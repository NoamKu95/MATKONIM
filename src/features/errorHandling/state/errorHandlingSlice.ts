import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyErrorData, AppErrorsUnion } from "../../../models/errors";

export interface ErrorHandlingState {
  isError: boolean;
  errorType: AppErrorsUnion | null;
  errorMessage: string;
  errorIcon: any;
}

const initialState: ErrorHandlingState = {
  isError: false,
  errorType: null,
  errorMessage: "",
  errorIcon: "",
};

export const ErrorHandlingSlice = createSlice({
  name: "ErrorHandlingSlice",
  initialState,
  reducers: {
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    setError: (state, action: PayloadAction<MyErrorData>) => {
      state.errorType = action.payload.type;
      state.errorIcon = action.payload.icon;
      state.errorMessage = action.payload.message;
    },
  },
});

export const { setIsError, setError } = ErrorHandlingSlice.actions;

export default ErrorHandlingSlice.reducer;
