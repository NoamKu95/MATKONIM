// Outer imports:
import i18n from "../../../translations/i18n";

// Types:
import {
  FirebaseErrors,
  GeneralErrorTypes,
  InputsValidationErrors,
  MyErrorData,
} from "../../../models/errors";

// Redux:
import { AppThunk } from "../../../store/store";
import { setError, setIsError } from "./errorHandlingSlice";

export const generalErrorHandler =
  (error: MyErrorData): AppThunk =>
  (dispatch, getState) => {
    dispatch(setError(error));
    dispatch(setIsError(true));
  };
export { setIsError };

export const defineValidationErrorMessage = (
  error: InputsValidationErrors
): string => {
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

export const defineGeneralErrorMessage = (error: GeneralErrorTypes): string => {
  switch (error) {
    case GeneralErrorTypes.NO_INTERNET:
      return i18n.t("errorHandling.noInternetDescription");
  }
};

export const defineFirebaseErrorMessage = (error: FirebaseErrors): string => {
  switch (error) {
    case FirebaseErrors.INVALID_IMAGE_URL:
      return i18n.t("errorHandling.FirebaseErrors.invalidImageUrl");
  }
};
