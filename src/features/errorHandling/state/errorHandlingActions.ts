import { batch } from "react-redux";
import { MyErrorData } from "../../../models/errors";
import { AppThunk } from "../../../store/store";
import { setError, setIsError } from "./errorHandlingSlice";

export const generalErrorHandler =
  (axiosError: MyErrorData): AppThunk =>
  (dispatch, getState) => {
    batch(() => {
      dispatch(setError(axiosError));
      dispatch(setIsError(true));
    });
  };
export { setIsError };
