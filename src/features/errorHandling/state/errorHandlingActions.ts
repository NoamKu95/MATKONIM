import { batch } from "react-redux";
import { InputsValidationErrors, MyErrorData } from "../../../models/errors";
import { AppThunk } from "../../../store/store";
import i18n from "../../../translations/i18n";
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

export const defineErrorMessage = (error: InputsValidationErrors): string => {
  switch (error) {
    case InputsValidationErrors.NULL_VALUE:
      return i18n.t("errorHandling.validationErrors.mandatoryField");
    case InputsValidationErrors.SPECIAL_CHARACTERS:
      return i18n.t("errorHandling.validationErrors.specialCharactersIssue");
    case InputsValidationErrors.TOO_SHORT:
      return i18n.t("errorHandling.validationErrors.contentTooShort");
    case InputsValidationErrors.BELOW_ZERO:
      return i18n.t("errorHandling.validationErrors.numBelowZero");
    default:
      return "";
  }
};
