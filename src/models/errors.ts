import { AxiosError } from "axios";

// list of all the possible errors that we want to handle
export enum MyErrorTypes {
  NO_INTERNET = 1,
}

export interface MyErrorData {
  type: MyErrorTypes;
  icon: any; // ask Chen
  message: string;
}

export enum InputsValidationErrors {
  NULL_VALUE = 1,
  TOO_SHORT,
  SPECIAL_CHARACTERS,
  BELOW_ZERO,
}
