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
  INVALID_IMAGE_URL = "INVALID_IMAGE_URL",
  FAILED_SAVE_AVATAR = "FAILED_SAVE_AVATAR",
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
