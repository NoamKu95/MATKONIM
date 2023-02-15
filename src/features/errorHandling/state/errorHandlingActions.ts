// Outer imports:
import i18n from "../../../translations/i18n";

// Inner imports:
import { icons } from "../../../constants/icons";

// Types:
import {
  FirebaseErrors,
  GeneralErrorTypes,
  InputsValidationErrors,
  MyErrorData,
} from "../../../models/errors";

// Redux:
import store, { AppThunk } from "../../../store/store";
import { setError, setIsError } from "./errorHandlingSlice";

export const generalErrorHandler =
  (error: MyErrorData): AppThunk =>
  (dispatch, getState) => {
    dispatch(setError(error));
    dispatch(setIsError(true));
  };
export { setIsError };

// ======= CREATE ERROR OBJECTS ======= //
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

export const defineGeneralErrorObject = (
  error: GeneralErrorTypes
): MyErrorData => {
  switch (error) {
    case GeneralErrorTypes.NO_INTERNET:
      return {
        type: "NO_INTERNET",
        icon: icons.no_internet,
        message: i18n.t("errorHandling.noInternetTitle"),
      };
  }
};

export const defineFirebaseErrorObject = (
  error: FirebaseErrors
): MyErrorData => {
  switch (error) {
    case FirebaseErrors.USER_NOT_FOUND:
      return {
        type: "USER_NOT_FOUND",
        icon: icons.sad_face,
        message: i18n.t("errorHandling.FirebaseErrors.userNotFound"),
      };
    case FirebaseErrors.INVALID_EMAIL_ADDRESS:
      return {
        type: "INVALID_EMAIL_ADDRESS",
        icon: icons.sad_face,
        message: i18n.t("errorHandling.FirebaseErrors.invalidEmail"),
      };
    case FirebaseErrors.EMAIL_ALREADY_EXISTS:
      return {
        type: "EMAIL_ALREADY_EXISTS",
        icon: icons.sad_face,
        message: i18n.t("errorHandling.FirebaseErrors.emailAlreadyExists"),
      };
    case FirebaseErrors.INVALID_PASSWORD:
      return {
        type: "INVALID_PASSWORD",
        icon: icons.sad_face,
        message: i18n.t("errorHandling.FirebaseErrors.invalidPassword"),
      };
    case FirebaseErrors.INVALID_IMAGE_URL:
      return {
        type: "INVALID_IMAGE_URL",
        icon: icons.broken_image,
        message: i18n.t("errorHandling.FirebaseErrors.invalidImageUrl"),
      };
    case FirebaseErrors.INVALID_CREDENTIALS:
      return {
        type: "INVALID_CREDENTIALS",
        icon: icons.sad_face,
        message: i18n.t("errorHandling.FirebaseErrors.invalidCredentials"),
      };
    case FirebaseErrors.FAILED_SAVE_AVATAR:
      return {
        type: "FAILED_SAVE_AVATAR",
        icon: icons.sad_face,
        message: i18n.t("errorHandling.FirebaseErrors.failedSaveAvatar"),
      };
    case FirebaseErrors.FIREBASE_INTERNAL_ERROR:
      return {
        type: "FIREBASE_INTERNAL_ERROR",
        icon: icons.sad_face,
        message: i18n.t("errorHandling.FirebaseErrors.firebaseInternalError"),
      };
    case FirebaseErrors.GENERAL_UNKNOWN_ERROR:
      return {
        type: "GENERAL_UNKNOWN_ERROR",
        icon: icons.sad_face,
        message: i18n.t("errorHandling.FirebaseErrors.generalUnknownError"),
      };
  }
};

// ======= ERROR HANDLERS ======= //
export const handleAuthErrors = (error: any) => {
  const errorMsg = error.message as string;
  let errorObject: MyErrorData | null = null;

  if (errorMsg.includes("user-not-found")) {
    errorObject = defineFirebaseErrorObject(FirebaseErrors.USER_NOT_FOUND);
  } else if (errorMsg.includes("email-already-exists")) {
    errorObject = defineFirebaseErrorObject(
      FirebaseErrors.EMAIL_ALREADY_EXISTS
    );
  } else if (errorMsg.includes("internal-error")) {
    errorObject = defineFirebaseErrorObject(
      FirebaseErrors.FIREBASE_INTERNAL_ERROR
    );
  } else if (errorMsg.includes("invalid-credential")) {
    errorObject = defineFirebaseErrorObject(FirebaseErrors.INVALID_CREDENTIALS);
  } else if (errorMsg.includes("invalid-email")) {
    errorObject = defineFirebaseErrorObject(
      FirebaseErrors.INVALID_EMAIL_ADDRESS
    );
  } else if (errorMsg.includes("invalid-password")) {
    errorObject = defineFirebaseErrorObject(FirebaseErrors.INVALID_PASSWORD);
  } else if (errorMsg.includes("user-not-found")) {
    errorObject = defineFirebaseErrorObject(FirebaseErrors.USER_NOT_FOUND);
  } else {
    errorObject = defineFirebaseErrorObject(
      FirebaseErrors.GENERAL_UNKNOWN_ERROR
    );
  }

  store.dispatch(generalErrorHandler(errorObject));
};
