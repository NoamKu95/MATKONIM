import i18n from "../translations/i18n";
// Redux:
import {
  setEmailWarning,
  setNameWarning,
  setPasswordWarning,
  setUserEmail,
  setUserPassword,
} from "../features/auth/state/authSlice";
import { InputsValidationErrors } from "../models/errors";
import { AppThunk } from "../store/store";

export const validateText = (
  text: string | null
): InputsValidationErrors | null => {
  if (text !== null) {
    if (text.length < 2) {
      return InputsValidationErrors.TOO_SHORT;
    } else {
      let reg = /^[^!-\/:-@\[-`{-~]+$/;
      if (!reg.test(text.trim())) {
        return InputsValidationErrors.SPECIAL_CHARACTERS;
      } else {
        return null;
      }
    }
  } else {
    return InputsValidationErrors.NULL_VALUE;
  }
};

export const validateNumber = (
  value: number | null
): InputsValidationErrors | null => {
  if (value !== null) {
    if (value <= 0) {
      return InputsValidationErrors.BELOW_ZERO;
    } else {
      return null;
    }
  } else {
    return InputsValidationErrors.NULL_VALUE;
  }
};

// =============== LOGIN & REGISTRATION VALIDATORS =============== //

export const validateEmail =
  (email: string | null): AppThunk =>
  async (dispatch) => {
    if (email) {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (!reg.test(email.trim())) {
        console.log(i18n.t("errorHandling.validationErrors.invalidEmail"));

        dispatch(
          setEmailWarning(i18n.t("errorHandling.validationErrors.invalidEmail"))
        );
        return false;
      } else {
        dispatch(setEmailWarning(null));
        dispatch(setUserEmail(email));
        return true;
      }
    } else {
      dispatch(
        setEmailWarning(i18n.t("errorHandling.validationErrors.emptyEmail"))
      );
      return false;
    }
  };

export const validatePassword =
  (password: string | null): AppThunk =>
  async (dispatch) => {
    if (password) {
      if (password === "") {
        dispatch(
          setPasswordWarning(
            i18n.t("errorHandling.validationErrors.emptyPassword")
          )
        );
        return false;
      } else {
        var reg =
          /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
        if (!reg.test(password.trim())) {
          dispatch(
            setPasswordWarning(
              i18n.t("errorHandling.validationErrors.weakPassword")
            )
          );
          return false;
        } else {
          dispatch(setPasswordWarning(null));
          dispatch(setUserPassword(password));
          return true;
        }
      }
    } else {
      dispatch(
        setPasswordWarning(
          i18n.t("errorHandling.errorValidation.emptyPassword")
        )
      );
      return false;
    }
  };

export const validateName =
  (name: string | null): AppThunk =>
  async (dispatch) => {
    if (name) {
      if (name.length === 0) {
        dispatch(
          setNameWarning(i18n.t("errorHandling.errorValidation.emptyUsername"))
        );
        return false;
      } else if (name.length < 2) {
        dispatch(
          setNameWarning(i18n.t("errorHandling.errorValidation.shortUsername"))
        );
        return false;
      } else {
        dispatch(setNameWarning(null));
        return true;
      }
    } else {
      dispatch(
        setNameWarning(i18n.t("errorHandling.errorValidation.emptyUsername"))
      );
      return false;
    }
  };
