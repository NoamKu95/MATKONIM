import { batch } from "react-redux";
import { MyServerError } from "../../../models/errors";
import { AppThunk } from "../../../store/store";
import { setErrorMessage, setIsError } from "./errorHandlingSlice";

export const generalErrorHandler =
  (axiosError: MyServerError): AppThunk =>
  (dispatch, getState) => {
    batch(() => {
      dispatch(setErrorMessage(axiosError.response?.data?.errorToClient));
      dispatch(setIsError(true));
    });
  };
export { setIsError };
