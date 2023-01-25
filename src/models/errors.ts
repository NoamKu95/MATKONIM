import { AxiosError } from "axios";

// list of all the possible errors that we want to handle
export enum MyErrorTypes {
  ERROR_CASE_1 = 1,
  ERROR_CASE_2,
}

// the general structure of the ServerErrorData
export interface MyServerErrorData {
  type: MyErrorTypes;
  errorToClient?: string;
  errorToDeveloper?: string;
  status?: number;
}

export interface MyServerError extends AxiosError<MyErrorTypes> {}
