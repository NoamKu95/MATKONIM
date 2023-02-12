export enum GeneralErrorTypes {
  NO_INTERNET = "NO_INTERNET",
}

export enum InputsValidationErrors {
  NULL_VALUE = "NULL_VALUE",
  TOO_SHORT = "TOO_SHORT",
  SPECIAL_CHARACTERS = "SPECIAL_CHARACTERS",
  BELOW_ZERO = "BELOW_ZERO",
}

export enum FirebaseErrors {
  INVALID_EMAIL_ADDRESS = "INVALID_EMAIL_ADDRESS",
  INVALID_PASSWORD = "INVALID_PASSWORD",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",
  INVALID_IMAGE_URL = "INVALID_IMAGE_URL",
  FAILED_SAVE_AVATAR = "FAILED_SAVE_AVATAR",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  FIREBASE_INTERNAL_ERROR = "FIREBASE_INTERNAL_ERROR",
  GENERAL_UNKNOWN_ERROR = "GENERAL_UNKNOWN_ERROR",
}

// Errors to raise ErrorPopup about
export type AppErrorsUnion =
  | keyof typeof GeneralErrorTypes
  | keyof typeof FirebaseErrors;

export interface MyErrorData {
  type: AppErrorsUnion;
  icon: any; // ask Chen
  message: string;
}
