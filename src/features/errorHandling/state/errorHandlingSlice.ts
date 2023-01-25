import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyErrorTypes } from "../../../models/errors";

export interface ErrorHandlingState {
  isError: boolean;
  errorType: MyErrorTypes;
  errorMessage: string;
}

const initialState: ErrorHandlingState = {
  isError: false,
  errorType: MyErrorTypes.ERROR_CASE_1,
  errorMessage: "",
};

export const ErrorHandlingSlice = createSlice({
  name: "ErrorHandlingSlice",
  initialState,
  reducers: {
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    setErrorType: (state, action: PayloadAction<MyErrorTypes>) => {
      state.errorType = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload) {
        state.errorMessage = action.payload;
      } else {
        state.errorMessage = "";
      }
    },
  },
});

export const { setIsError, setErrorType, setErrorMessage } =
  ErrorHandlingSlice.actions;

export default ErrorHandlingSlice.reducer;
