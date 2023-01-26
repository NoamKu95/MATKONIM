import {
  setEmailWarning,
  setNameWarning,
  setPasswordWarning,
  setUserEmail,
  setUserPassword,
} from "../features/auth/state/authSlice";
import { AppThunk } from "../store/store";
import i18n from "../translations/i18n";

export enum ValidationError {
  nullValue,
  tooShort,
  specialCharacters,
  belowZero,
}

export const validateText = (text: string | null): ValidationError | null => {
  if (text !== null) {
    if (text.length < 2) {
      return ValidationError.tooShort;
    } else {
      let reg = /^[^!-\/:-@\[-`{-~]+$/;
      if (!reg.test(text.trim())) {
        return ValidationError.specialCharacters;
      } else {
        return null;
      }
    }
  } else {
    return ValidationError.nullValue;
  }
};

export const validateNumber = (
  value: number | null
): ValidationError | null => {
  if (value !== null) {
    if (value <= 0) {
      return ValidationError.belowZero;
    } else {
      return null;
    }
  } else {
    return ValidationError.nullValue;
  }
};

// =============== LOGIN & REGISTRATION VALIDATORS =============== //

export const validateEmail =
  (email: string | null): AppThunk =>
  async (dispatch) => {
    if (email) {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (!reg.test(email.trim())) {
        dispatch(
          setEmailWarning(i18n.t("errorHandling.errorValidation.invalidEmail)"))
        );
        return false;
      } else {
        dispatch(setEmailWarning(null));
        dispatch(setUserEmail(email));
        return true;
      }
    } else {
      dispatch(
        setEmailWarning(i18n.t("errorHandling.errorValidation.emptyEmail)"))
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
            i18n.t("errorHandling.errorValidation.emptyPassword)")
          )
        );
        return false;
      } else {
        var reg =
          /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
        if (!reg.test(password.trim())) {
          dispatch(
            setPasswordWarning(
              i18n.t("errorHandling.errorValidation.weakPassword)")
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
          i18n.t("errorHandling.errorValidation.emptyPassword)")
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
          setNameWarning(i18n.t("errorHandling.errorValidation.emptyUsername)"))
        );
        return false;
      } else if (name.length < 2) {
        dispatch(
          setNameWarning(i18n.t("errorHandling.errorValidation.shortUsername)"))
        );
        return false;
      } else {
        dispatch(setNameWarning(null));
        return true;
      }
    } else {
      dispatch(
        setNameWarning(i18n.t("errorHandling.errorValidation.emptyUsername)"))
      );
      return false;
    }
  };
